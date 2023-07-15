import json
import requests
import pickle
import uvicorn
import os
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
from random import randrange

from fastapi import FastAPI

app = FastAPI()

origins = ["*"]

API_KEY = "38269660-6dad03eb844ef97e2a0897bcf"
URL = "https://pixabay.com/api/?key={}&q={}"

with open('config/people.json') as file:
    file_contents = file.read()
CONFIG = json.loads(file_contents)
NAMES = ["crista", "tucker", "kaz", "jen", "zack", "cleo"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def search_image(search): 
    if search == "tucker":
        return "https://i.postimg.cc/V6w11X67/tucker.jpg"
    elif search == "crista":
        return "https://i.postimg.cc/2STX3v2c/crista.jpg"
    response = requests.get(URL.format(API_KEY, search))
    jres = json.loads(response.text)
    hits = jres["hits"]
    return hits[randrange(len(hits))]["largeImageURL"]

@app.get("/present/{name}")
def read_present(name):
    options = []
    if not name in NAMES:
        options = CONFIG["other"]
    else:
        options = CONFIG[name]
    present = options[randrange(len(options))]
    imageURL = search_image(present["search"])
    return {
        "response": present["text"],
        "imageURL": imageURL
    }

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=int(os.environ['PORT']))
