from flask import Flask, session, request, escape, url_for
from flask import request
from flask_cors import CORS
# from firebase_admin import db
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import flask
import json
import os
import uuid

app = Flask(__name__)
CORS(app) # Allow CORS

# Use a service account
cred = credentials.Certificate('creds.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

USERS = db.collection(u'users')
ENTRIES = db.collection(u'entries')
ENTITIES = db.collection(u'entities')

def parseEntry(entry):
	pass

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
	ENTRIES.document(str(uuid.uuid1())).set({
		u'content': req['content'],
		u'date': req['date']
	})
	return flask.jsonify({'status': 'added'}), 201

# GET all entries
@app.route("/entries")
def retrieve_posts():
	docs = ENTRIES.order_by("date", direction="DESCENDING").stream()
	entry_list = [doc.to_dict() for doc in docs]
	
	print(entry_list)
	print(type(entry_list))
	return flask.jsonify(entry_list), 201

app.secret_key = os.urandom(24)
app.run(host= '0.0.0.0')
