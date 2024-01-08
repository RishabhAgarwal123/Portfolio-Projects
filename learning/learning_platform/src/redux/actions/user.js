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