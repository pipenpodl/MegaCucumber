from json import dump, load
from pathlib import Path


relative_path = 'raspi_client/client_raspberry_pi/default/default.json'

# function to write data to a file
def write_file(value, path=Path.cwd().joinpath(relative_path)):
    with open(path, 'w') as file:
        dump(value, file, indent=4)

# функция для считывания  данных из файла
def read_file(path=Path.cwd().joinpath(relative_path)):
    with open(path,"r") as file:
        return load(file)
        






