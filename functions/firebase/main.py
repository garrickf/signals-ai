"""
Firestore-triggered Cloud Functions.
"""

import json
from google.cloud import firestore
client = firestore.Client()
import random


def hello_firestore(data, context):
    """ Adapted from docs on Firestore triggers
    Args:
        data (dict): The event payload.
        context (google.cloud.functions.Context): Metadata for the event.

    Triggers:
        entries/{id}
    """
    trigger_resource = context.resource

    print('Function triggered by change to: %s' % trigger_resource)

    print('\nNew value:')
    print(json.dumps(data["value"]))


def process_entry(data, context):
    # Take everything after '/documents/' and split on '/'
    path_parts = context.resource.split('/documents/')[1].split('/')
    # The collection is the first part of path_parts
    collection_path = path_parts[0]
    document_path = '/'.join(path_parts[1:])

    # We want to update the doc at collection/document
    affected_doc = client.collection(collection_path).document(document_path)

    # Document fields are accessed under fields
    cur_value = data['value']['fields']['content']['stringValue']
    print('Performing analysis on value: {}'.format(cur_value))

    # TODO: sentiment analysis here
    mood = random.choice(range(5)) + 1
    print('Sentiment: {}'.format(mood))

    # TODO: NER here
    tags = [{'_id': '1', 'name': 'Ryan', 'variant': 'PERSON'}]
    print('Tags: {}'.format(str(tags)))

    # Set ALL fields after processing
    affected_doc.set({
        'mood': mood,
        'tags': tags,
        'content': cur_value,
        'date': data['value']['fields']['date']['stringValue']
    })
