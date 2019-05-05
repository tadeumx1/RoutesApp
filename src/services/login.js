import api from './api'
// import axios from 'axios'

export function login (payload) {
    return api.post('/sessions', payload)
        .then(response => { return response.data })
        // .catch(error => { console.error(error) })
}

/* export function login (payload) {
    return axios.post('http://10.0.3.2:3000/sessions', payload)
        .then(response => { return response.data })
        // .catch(error => { console.error(error) })
} */