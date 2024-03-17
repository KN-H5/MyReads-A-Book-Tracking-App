const api = "https://reactnd-books-api.udacity.com"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token) {
    token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const get = (bookId) =>
    fetch(`${api}/books/${bookId}`, {
        headers
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(data => data.book)
    .catch(error => console.log(error));

export const getAll = () =>
    fetch(`${api}/books`, {
        headers
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(data => data.books)
    .catch(error => console.log(error));

export const update = (book, shelf) =>
    fetch(`${api}/books/${book.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shelf
        })
    })
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => console.log(error));

export const search = (query) =>
    fetch(`${api}/search`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query
        })
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(data => data.books)
    .catch(error => console.log(error));
