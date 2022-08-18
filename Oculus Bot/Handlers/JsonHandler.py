import json

def getToken():
    with open('config.json', 'r') as file:
        json_obj = json.load(file)
        
    print(json_obj)