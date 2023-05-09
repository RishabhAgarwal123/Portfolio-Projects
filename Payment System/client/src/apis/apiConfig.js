import axios from 'axios';

export const ApiConfig = axios.create({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});