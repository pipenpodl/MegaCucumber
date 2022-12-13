from time import sleep
import RPi.GPIO as GPIO
from .pins import *
from check import *

# The function of obtaining values ​​from the water level sensor
def water_state():
    try:
        if GPIO.input(PIN_UP) == 0 and GPIO.input(PIN_DOWN) == 0:
            value = 'Empty'
            
        elif GPIO.input(PIN_UP) == 1 and GPIO.input(PIN_DOWN) == 0:
            value = 'Half'

        elif GPIO.input(PIN_UP) == 1 and GPIO.input(PIN_DOWN) == 1:
            value = 'Full'

        elif GPIO.input(PIN_UP) == 0 and GPIO.input(PIN_DOWN) == 1:
            value = 'check sensor'

        return value

    except:
        return "check sensor water level"

# Function for obtaining values ​​from the solution temperature sensor
def temperature_solution():
    try:
        if chan_temperature_solution.voltage >= 1:
            return str(round((chan_temperature_solution.voltage / 4) * 80)) + " ℃"

        elif chan_temperature_solution.voltage < 1:
            return str(round(((chan_temperature_solution.voltage / 1) * 20) * -1)) + " ℃"

    except:
        return "check sensor temperature solution"        

# Function for obtaining values ​​from a temperature sensor am2320
def temperature():
    try:
        return str(am.temperature) + " ℃"
    except:
        return "check sensor am2320" 

# Function for obtaining values ​​from a humidity sensor am2320
def humidity():
    try:
        return str(am.relative_humidity) + " %"
    except:
        return "check sensor am2320" 

# The function of obtaining values ​​from the light level sensor bh1750
def lux():
    try:
        return str(bh1750_sensor.lux) + " lux"
    except:
        return "check sensor bh1750" 

        


