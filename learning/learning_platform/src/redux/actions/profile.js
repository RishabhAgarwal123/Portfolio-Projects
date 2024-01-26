import axios from "axios";
import { server } from "../store";

export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({ type: 'changePasswordRequest' });
        const { data } = await axios.put(`${server}/updatepassword`, { oldPassword, newPassword }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });
        dispatch({ type: 'changePasswordSuccess', payload: data?.message });
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'changePasswordFail', payload: error?.response?.data?.message });
    }
}

export const updateProfile = (name, email) => async (dispatch) => {
    try {
        dispatch({ type: 'updateProfileRequest' });
        const { data } = await axios.put(`${server}/updateprofile`, { name, email }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });
        dispatch({ type: 'updateProfileSuccess', payload: data?.message });
    } catch (error) {
        console.log(error)
        dispatch({ type: 'updateProfileFail', payload: error?.response?.data?.message });
    }
}

export const updateProfilePicture = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'updateProfilePictureRequest' });
        const { data } = await axios.put(`${server}/updateprofilepicture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
        });
        dispatch({ type: 'updateProfilePictureSuccess', payload: data?.message });
    } catch (error) {
        console.log(error)
        dispatch({ type: 'updateProfilePictureFail', payload: error?.response?.data?.message });
    }
}