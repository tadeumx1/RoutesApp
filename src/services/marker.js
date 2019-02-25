import api from './api'

export function addMarker (payload) {
    return api.post('/markers', payload)
        .then(response => { return response.data })
        .catch(error => { console.error(error) })
}