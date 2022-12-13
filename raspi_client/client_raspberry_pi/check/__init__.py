# modules for reading readings from sensors
import RPi.GPIO as GPIO
import board
import busio
import adafruit_am2320
import adafruit_ads1x15.ads1015 as ADS
import adafruit_bh1750
from adafruit_ads1x15.analog_in import AnalogIn


i2c = board.I2C()  

am2320_error = False
bh1750_error = False
ads_error = False

# Checking for sensor connections
try:
    am = adafruit_am2320.AM2320(i2c)
except:
    am2320_error = True


try:
    bh1750_sensor = adafruit_bh1750.BH1750(i2c)
except:
    bh1750_error = True


try:
    ads = ADS.ADS1015(i2c)
    chan_temperature_solution = AnalogIn(ads, ADS.P0)
    chan_ph = AnalogIn(ads, ADS.P1)
    chan_tds = AnalogIn(ads, ADS.P2)

except:
    ads_error = True

from .check_sensor import *
from .relay import *

# Relay initialization
GPIO.setmode(GPIO.BCM)

GPIO.setup(PIN_UP, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(PIN_DOWN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

GPIO.setup(PIN_LIGHT, GPIO.OUT, initial=GPIO.HIGH)
GPIO.setup(PIN_PUMP, GPIO.OUT, initial=GPIO.HIGH)
GPIO.setup(PIN_RELAY_3, GPIO.OUT, initial=GPIO.HIGH)