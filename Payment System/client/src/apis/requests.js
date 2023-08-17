import { ApiConfig } from './apiConfig';

// get all request
export const GetAllRequestsByUser = async () => {
    try {
        return await ApiConfig.post('/api/requests/get-all-requests-by-user');
    } catch (error) {
        return error.response.data;
    }
}

// get request to other user
export const SendRequest = async (payload) => {
    try {
        return await ApiConfig.post('/api/requests/send-requests', payload);
    } catch (error) {
        return error.response.data;
    }
}

// accept or reject request