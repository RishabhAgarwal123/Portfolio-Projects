import { server } from "../store";
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'loginRequest' });
        const { data } = await axios.post(`${server}/login`, {
            email, password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });
        if (data?.success) dispatch({ type: 'loginSuccess', payload: data });
        else dispatch({ type: 'loginFail', payload: data?.message });
    } catch (error) {
        console.log(error)
        dispatch({ type: 'loginFail', payload: error?.response?.data?.message });
    }
}

export const getMyProfile = () => async (dispatch) => {
    try {
        dispatch({ type: 'loadUserRequest' });
        const { data } = await axios.get(`${server}/me`, {
            withCredentials: true,
        });
        if (data?.success) dispatch({ type: 'loadUserSuccess', payload: data?.user });
        else dispatch({ type: 'loadUserFail', payload: data?.message });
    } catch (error) {
        console.log(error)
        dispatch({ type: 'loadUserFail', payload: error?.response?.data?.message });
    }
}