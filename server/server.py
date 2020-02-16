from flask import Flask, session, request, escape, url_for
from flask import request
from flask_cors import CORS
from firebase_admin import db
import firebase_admin
import flask
import json
import os
from ner import calcPolarity, discretePolarity, entities

app = Flask(__name__)
CORS(app)
firebase_admin.initialize_app(options={
	'databaseURL': 'https://signals-ai.firebaseio.com'
})

USERS = db.reference('users')
ENTRIES = db.reference('entries')
ENTITIES = db.reference('entities')

def parseEntry(entry):
	content = entry.get("content")
	sentiment = calcPolarity(content)
	tags = entities(entry)
	print(content)
	print(sentiment)
	print(tags)

def parseUser():
	pass

def usernameTaken():
	pass

def userExists(username):
	user = USERS.child(username).get()
	if not user:
		return False
	return True

# Server Test (GET)
@app.route("/")
def index():
	if 'username' in session:
		return 'Logged in as %s' % escape(session['username'])
	return 'You are not logged in'

### USERS: CREATE USER, HANDLE LOGIN/LOGOUT ###

# Create a user. Expected Fields:
### username 
@app.route("/users/create", methods=['POST'])
def create_user():
	req = flask.request.json
	username = req.get('username')
	if not username:
		flask.abort(400, 'no username given')
	elif userExists(username):
		flask.abort(400, 'username taken')
	else:
		USERS.child(username).set({
			"username": username
		})
	return flask.jsonify({'success': True}), 201

# Log in. Expected Fields:
### username
@app.route('/login', methods=['GET', 'POST'])
def login():
	if request.method == 'POST':
		session['username'] = request.form['username']
		return redirect(url_for('index'))
	return '''
		<form action="" method="post">
			<p><input type=text name=username>
			<p><input type=submit value=Login>
		</form>
	'''

### POSTS: CREATE POST, RETRIEVE ALL POSTS

# POST a diary entry
@app.route("/entry/create", methods=['POST'])
def create_post():
	req = flask.request.json
	parseEntry(req)
	print(type(req), "Content:", req["content"])
	entry = ENTRIES.push(req)
	return flask.jsonify({'id': entry.key}), 201

# GET all entries
@app.route("/entries")
def retrieve_posts():
	entries = ENTRIES.get()
	entry_list = []
	for entry in entries.items():
		key, val = entry
		val["_id"] = key
		entry_list.append(val)
	print(entry_list)
	print(type(entry_list))
	return flask.jsonify(entry_list), 201


app.secret_key = os.urandom(24)
app.run(host= '0.0.0.0')