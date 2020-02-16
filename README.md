# signals-ai 
**Signals** is an intelligent journalling app that promotes consistent self-reflection by 
revealing relationships and trends in your writings. The final product is a React client that interfaces with a lightweight Flask backend. Firestore is used as the database solution, and Google Cloud Functions are used to run ML tasks on user-submitted data. The models we use are pre-trained, and, in the interest of privacy, we don't loop user data back into learning.

> This project was developed in (less than) 36 hours at Stanford TreeHacks 2020 by Ben Anderson, Garrick Fernandez and Natalie Gable!

# Running the Flask webserver ⚗️

Flask is our backend! To run the Flask webserver, navigate to the `server` directory. You'll need to create
a Python virtual environment (here we make one called `env`):

```shell
python3 -m venv env
```

Then, activate the environment (note that it's `source env/bin/activate.fish` for 
fish shell users!):

```shell
source env/bin/activate
```

Then, install all requirements:

```shell
pip install requirements.txt
```

Now you can run the web server!

```shell
python server.py
```

This will put it on [`http://localhost:5000/`](http://localhost:5000/). If you're developing across multiple machines (as our team was!) and need to create a tunnel to your `localhost`, consider `ngrok`:

```shell
ngrok http 5000
```

# Running the React client ⚛️

We wrote the front end in React. To use it, `cd` to the `client` directory and
run:

```shell
npm start
```

The client hits some endpoints on the Flask server, as well as a Firebase backend.
More on that to come!

# Building and Deploying Cloud Functions 🌩

We use Google Cloud Platform's (GCP) Cloud Functions in order to listen for changes in a Cloud Firestore database and perform data analysis on journal entries. In order to develop on these, check out the [README](./functions) in the `functions` directory.

# Managing Firebase 🔥

Right now, we're using Cloud Firestore as a database solution. Helpful links:

- [Firebase Console](https://console.firebase.google.com/) (For checking Firestore)
- [GCP Console](https://console.cloud.google.com/) (For checking Cloud Functions, logs, and billing accounts)

# Building Models 🧱

Coming soon...
