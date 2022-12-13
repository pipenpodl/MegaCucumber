#!/bin/bash
cd client_raspberry_pi
python3 -m venv venv

source venv/bin/activate; pip install -r requirements.txt

$SHELL