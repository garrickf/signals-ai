# signals-ai 
AI Journal

# Running the Flask webserver ⚗️

To run the Flask webserver, navigate to the `server` directory. You'll need to create
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

# Running the React client ⚛️

We wrote the front end in React. To use it, `cd` to the `client` directory and
run:

```shell
npm start
```

The client hits some endpoints on the Flask server, as well as a Firebase backend.
More on that to come!
