from flask import Flask, request, jsonify
from flask_cors import CORS
from threading import Thread
import socket
import json

# example: (192.168.0.1, 5005)
IP_AND_PORT = ("In this line, specify the desired ip, and instead of 5005", 5005)


def get_settings():
    with open('settings.json', 'r') as f:
        settings = json.load(f)
    return settings


def set_settings():
    with open('settings.json', 'w') as f:
        json.dump(
            {"settings": {"start": "06:00", "end": "20:00", "waterings": []}})


def socket_func():
    global sensors, settings, states, data_is_empty

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.bind((IP_ADDRESS, PORT))
    sock.listen()

    print("|************ START SERVER ************|")
    while True:
        client_socket = sock.accept()[0]
        requests = client_socket.recv(4096)
        data = json.loads(requests.decode())

        if data['sensors']:
            sensors = data['sensors']

        if data['states']:
            states = data['states']

        if not data_is_empty:
            client_socket.send(json.dumps(data_to_client).encode())
            data_is_empty = True

        client_socket.send(b"None")


data_to_client = {}

app = Flask(__name__)
CORS(app)

data_is_empty = True

sensors = {}
states = {"lamps_state": False, "pump_state": False, "manual": False}
json_to_client = {}

try:
   settings = get_settings()

except:
    set_settings()
    settings = get_settings()


@app.route("/sensors", methods=["POST", "GET"])
def sensors_page():
    return jsonify(sensors)


@app.route("/states", methods=["POST", "GET"])
def states_page():
    global states, data_to_client, data_is_empty

    if request.method == 'POST':
        data_is_empty = False
        data = request.get_json()
        data_to_client = {"states": data}

    return jsonify(states)


@app.route('/settings', methods=['GET', "POST"])
def settings_page():
    global settings, data_to_client, data_is_empty

    if request.method == 'POST':
        data_is_empty = False
        data = request.get_json()
        settings = data

        with open('settings.json', 'w') as f:
            json.dump(data, fp=f, indent=4)
            
        data_to_client = settings

    return jsonify(settings['settings'])


if __name__ == "__main__":
    Thread(target=socket_func, daemon=True).start()
    app.run(host=IP_AND_PORT[0], port=5010)
