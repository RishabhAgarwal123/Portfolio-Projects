import { ApiConfig } from "./apiConfig";

// Login user
export const LoginUser = async (payload) => {
    try {
        return await ApiConfig.post('/api/users/login', payload)
    } catch (error) {
        return error.response.data;
    }
}

// Register User
export const RegisterUser = async (payload) => {
    try {
        return await ApiConfig.post('/api/users/register', payload);
    } catch (error) {
        return error.response.data;
    }
}

// Get user info
export const GetUser = async () => {
    try {
        return await ApiConfig.post('/api/users/get-user');
    } catch (error) {
        return error.response.data
    }
}

// get all users
export const GetUserList = async () => {
    try {
        return await ApiConfig.get('/api/users/get-all-users');
    } catch (error) {
        return error.response.data;
    }
}

// upate verification status
export const UpdateVerificationStatus = async (payload) => {
    try {
        return await ApiConfig.post('/api/users/update-user-verification-status', payload)
    } catch (error) {
        return error.response.data;
    }
}