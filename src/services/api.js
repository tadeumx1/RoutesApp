import axios from 'axios';

import { getUser } from '../utils'

const api = axios.create ({

    baseURL: 'http://10.0.3.2:3000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

});

api.interceptors.request.use(
	(config) => {
	    config.headers.Authorization = `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDRmNzE4MTEzMTZjMTk4MDliOWExMyIsImlhdCI6MTU1MjI2OTY2OCwiZXhwIjoxNTUyMzU2MDY4fQ.RrmlXUFnAer3puFH-_8E8mPXDriuIRJt7ZSDmsPfgqM'}`;
		console.log(config)
		return Promise.resolve(config)
	},
	error => {
		return Promise.reject(error);
	}
);

/* api.interceptors.request.use(
	(config) => {
		return getUser()
			.then(user => {
				user = JSON.parse(user);
				if (user && user.token)
					config.headers.Authorization = `Bearer ${user.token}`;
				console.log(config)
				return Promise.resolve(config)
			})
	},
	error => {
		return Promise.reject(error);
	}
); */

export default api