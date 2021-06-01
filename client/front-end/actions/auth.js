import fetch from 'isomorphic-fetch'

import {API} from '../config'

export const Signup = (user) => {
    return fetch(`${API}/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


export const Signin = (user) => {
    return fetch(`${API}/login`, {
        method:'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}