# Google Cloud Functions Guide

Here's what we know so far about Cloud Functions! Right now, we're using the Google
Cloud Functions API, *not* the Firebase Cloud Functions API. That one [layers on top of the
GCP API](https://stackoverflow.com/questions/57149078/firebase-cloud-functions-using-python) and is a little bit more limited (you can only write in JavaScript, for example).

The basic idea is that, instead of writing an entire backend, write a few functions that
do the work you need to do. These function will be called at specific times or in
response to events (triggers), will spin up resources and do their amount of work, then
shut down. Neat!

Quick links to get caught up:

- [Quickstart guides for setting up `gcloud` CLI](https://cloud.google.com/sdk/docs/quickstarts)
- [Firebase's "What can I do with Cloud Functions?"](https://firebase.google.com/docs/functions/use-cases)
- [HTTP triggers and Hello World example](https://cloud.google.com/functions/docs/calling/http)
- [Writing with Firestore triggers](https://cloud.google.com/functions/docs/calling/cloud-firestore) (Note: in Beta, 2/15/20)
- [Specifying dependencies in Python](https://cloud.google.com/functions/docs/writing/specifying-dependencies-python)
- [Deploying a Cloud Function](https://cloud.google.com/functions/docs/deploying/filesystem)

# Deploying a Cloud Function

Here's what you need on hand to deploy:

- Install the `gcloud` CLI and run `gcloud init` to log in and link to the project
- Be currently in the directory where your functions (in `main.py`) are written
- The service account use for deployment

The command, as lifted from the the deploy guide, is:

```shell
gcloud functions deploy NAME --entry-point ENTRY_POINT --runtime python37 TRIGGER --service-account=SERVICE_ACCOUNT
```

Where:

- `NAME` is the name of the Cloud Function, e.g. `hello`.
- `ENTRY_POINT` is the name of the function inside `main.py` to use, e.g. `hello_http`.
- `--runtime` specifies the runtime to use.
- `TRIGGER` can be an extra flag describing how the function is triggered. e.g. `--trigger-http`.
- `SERVICE_ACCOUNT` is the service account used to set up the Cloud Function. It defaults, but if you get an error, it could be because we set up with Firebase and got our service account from there. You can find the service account with the credentials wizard [here](https://console.cloud.google.com/apis/credentials/wizard).

Deploying a Cloud Function that's triggered by a change in Firestore requires these flags:

```shell
gcloud functions deploy process_entry \
  --entry-point process_entry \
  --runtime python37 \
  --trigger-event providers/cloud.firestore/eventTypes/document.create \
  --trigger-resource "projects/signals-ai/databases/(default)/documents/entries/{id}" \
  --service-account=SERVICE_ACCOUNT
```

Where:

- `NAME`, `ENTRY_POINT`, and `SERVICE_ACCOUNT` are the same as above.
- `--trigger-event` is a flag specifying the CRUD operation triggering our Cloud Function.
- `--trigger-resource` is a flag specifying the resource. It's important that it's a string of the format:

```
projects/PROJECT_ID/databases/(default)/documents/PATH_TO_DOCUMENT
```
