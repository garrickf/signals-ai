import requests
import flask


API_ENDPOINT = "http://127.0.0.1:5000/entry/create"

entry = {
    "user": "garrick_fernandez"
    "content": "Hello, this is a diary entry."
}

r = requests.post(url=API_ENDPOINT, json=data)

print(f"Response: {r.text}")
"""


API_ENDPOINT = "http://127.0.0.1:5000/entries"

user = {
	"username": "ben"
}

r = requests.get(url=API_ENDPOINT)

print(f"Response: {r.text}")
"""
