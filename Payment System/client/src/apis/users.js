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
        return ApiConfig.post('/api/users/register', payload);
    } catch (error) {
        return error.response.data;
    }
}