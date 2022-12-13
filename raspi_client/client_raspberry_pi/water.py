from settings import *
from datetime import datetime, time, timedelta
from check import *

# the function checks whether the system is working in automatic mode or not, and depending on this controls the relay
def check_relay_client(data_client):
    if not data_client["manual"]:
        if data_client["lamps_state"]:
            manual_relay(True, PIN_LIGHT)
            
        else:   
            manual_relay(False, PIN_LIGHT) 
            

        if data_client["pump_state"]:
            manual_relay(True, PIN_PUMP)
            
        else:   
            manual_relay(False, PIN_PUMP) 

# converts time from string to datetime format with current date
def convert_time(value, hours=0):
    h = int(value.split(':')[0])
    m = int(value.split(':')[1])

    return datetime.combine(datetime.today(), time(hour=h, minute=m)) + timedelta(hours=hours)

# The function returns a tuple with the time of the next watering and the number of liters of solution for watering
# If the settings with watering did not come from the server, it returns false
def get_time_watering():
    settings_watering = read_file()["settings"]["waterings"]
    
    if len(settings_watering) == 0:
        return False
    result = []

    for i in settings_watering:
        if convert_time(i["start"]) > datetime.now():
            result.append((convert_time(i["start"]), int(i["litres"]), i["id"], False))


    if result:
        return min(result, key=lambda x: x[0])

    else:
        return (convert_time(settings_watering[0]['start']), int(settings_watering[0]['litres']), settings_watering[0]["id"], True)

# Since there is no sensor for calculating the liters spent, I had to make a function that replaces it
litr = 0
def check_litres():
    global litr
    litr += 1
    return litr

# the function looks at how many liters of solution have been spent and, depending on this, controls the pump relay
def check_watering(manual_relay, litres):
    global litr

    if check_litres() < litres:
        manual_relay(True, PIN_PUMP)
        return True

    else:  
        litr = 0
        manual_relay(False, PIN_PUMP) 
        return False
         



        



