/**
 * API helper functions
 */

const BASE_URL = 'http://localhost:5000/';

export const getEntries = (callback) => {
  const path = 'entries';

  fetch(BASE_URL + path).then(response => {
    return response.json();
  }).then(data => {
    callback(data);
  })
}

export const recordEntry = entry => {
  const path = 'entry/create';

  const data = {
    date: Date().toString(),
    content: entry
  };

  fetch(BASE_URL + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
}
