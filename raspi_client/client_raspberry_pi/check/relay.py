import RPi.GPIO as GPIO
from .pins import *

# Function for relay control
def manual_relay(state, pin):
    if state:
        GPIO.output(pin, GPIO.LOW)
    else:
        GPIO.output(pin, GPIO.HIGH)








   

        

   




