from threading import Thread
from time import sleep
from check import *
from settings import *
from datetime import datetime, timedelta
from water import *
import socket
import json
import hashlib

# example: (192.168.0.1, 5005)
IP_AND_PORT = ("In this line, specify the desired ip, and instead of 5005, the desired port", 5005)


def main():
    # Reading data from json for the initial start of the system
    states = read_file()["states"]
    settings = read_file()["settings"]

    check_relay_client(states)

    flag_send = True
    flag = True

    time_water = get_time_watering()
    
    # I use a hash to find out if the states dictionary has changed
    hs = hashlib.sha1(str(states).encode()).hexdigest()

    is_id = []
    
    print("Start work")

    while True:

        # if manual is true, then the system works automatically according to the specified parameters,
        # turns on and off the relay
        if states["manual"]:

            # Turn n or turn off the light relay depending on the parameters
            light_start = convert_time(settings["start"])
            light_end = convert_time(settings["end"])

            if light_start > light_end:
                light_end + timedelta(days=1)

            if light_start < datetime.now() < light_end:
                manual_relay(True, PIN_LIGHT)
                states["lamps_state"] = True         

            else:
                manual_relay(False, PIN_LIGHT)
                states["lamps_state"] = False

            # Enable or disable the pump relay depending on the parameters

            #The pump will not work if the water level sensor indicates that the tank is empty
            if water_s == "Full" or water_s == "Half":
                if flag:
                    if isinstance(time_water, tuple):
                        if time_water[3]:
                            # each watering has an id, so as not to repeat the same watering in a circle
                            is_id = []

                        if time_water[2] not in is_id:
                            if time_water[0] == datetime.now().replace(second=0, microsecond=0):
                                is_id.append(time_water[2])
                                flag = False

                        else:
                            time_water = get_time_watering() 
                            manual_relay(False, PIN_PUMP) 
                            states["pump_state"] = False  

                    else:
                        manual_relay(False, PIN_PUMP) 
                        states["pump_state"] = False          

                else:        
                    states["pump_state"] = True

                    if not check_watering(manual_relay, time_water[1]):
                        flag = True         
                        time_water = get_time_watering()
                        states["pump_state"] = False

            else:            
                manual_relay(False, PIN_PUMP)
                states["pump_state"] = False

            # checking for a change in the states dictionary
            if hs != hashlib.sha1(str(states).encode()).hexdigest():
                flag_send = True
                hs = hashlib.sha1(str(states).encode()).hexdigest()

        # Processing block for receiving data from the server and sending to the server
        try:
            client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            client.connect(IP_AND_PORT)
            
            # sending data from raspberry to server 
            if flag_send:
                send_data = {
                    "sensors": sensors,
                    "states": states,
                }
                flag_send = False

            else:
                send_data = {
                    "sensors": sensors,
                    "states": False,
                }

            client.send(json.dumps(send_data).encode())  

            # Receiving data from the server
            request = client.recv(4096).decode()
            
            try:
                data_client = json.loads(request)
                if data_client:
                    change = read_file()

                    if str(*data_client.keys()) == "states":
                        states = data_client["states"]
                        check_relay_client(states)
                        change["states"] = states

                        flag_send = True

                    elif str(*data_client.keys()) == "settings":
                        settings = data_client["settings"]
                        change["settings"] = settings
                        time_water = get_time_watering()

                        flag_send = True
                    
                    write_file(change) 

            except:    
                pass

        except TimeoutError:
            print("Connection timed out")

        except ConnectionRefusedError:
            print("server not connetion")

        except OSError:
            print("not route")    

        sleep(0.5)
        
# The flow of data processing from sensors and the formation of a dictionary to be sent to the server
def sensor_handler():
    global sensors, water_s

    while True:
        if not am2320_error:
            temp = temperature()
            hum = humidity()
        else:   
            temp = "check connection" 
            hum = "check connection"  

        if not ads_error:
            temp_solution = temp_solution()

        else:    
            temp_solution = "check connection"   

        if not bh1750_error:
            lx = lux()

        else:
            lx = "check connection" 
        
        water_s = water_state()


        sensors = {
            "temperature": temp,
            "humidity": hum,
            "temperature_solution": temp_solution,
            "water_state": water_s,
            "lux": lx, 
            "time": datetime.now().strftime('%H:%M'),
            "date": datetime.now().date().strftime('%d.%m.%y'),
        }
        sleep(5)


sensor_thread = Thread(target=sensor_handler)


if __name__ == "__main__":
    sensor_thread.start()
    main()
 


    
    