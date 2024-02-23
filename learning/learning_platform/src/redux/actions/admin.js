import axios from "axios";
import { server } from "../store";

export const createCourse = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'createCourseRequest' });
        const { data } = await axios.post(`${server}/createcourse`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
        });
        dispatch({ type: 'createCourseSuccess', payload: data?.message });
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'createCourseFail', payload: error?.response?.data?.message });
    }
}

export const createLecture = (courseId, formData) => async (dispatch) => {
    try {
        dispatch({ type: 'createLectureRequest' });
        const { data } = await axios.post(`${server}/course/${courseId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
        });
        dispatch({ type: 'createLectureSuccess', payload: data?.message });
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'createLectureFail', payload: error?.response?.data?.message });
    }
}

export const deleteCourse = (courseId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteCourseRequest' });
        const { data } = await axios.delete(`${server}/course/${courseId}`, {
            withCredentials: true,
        });
        dispatch({ type: 'deleteCourseSuccess', payload: data?.message });
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'deleteCourseFail', payload: error?.response?.data?.message });
    }
}

export const deleteLecture = (courseId, lectureId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteLectureRequest' });
        const { data } = await axios.delete(`${server}/lecture/?courseId=${courseId}&lectureId=${lectureId}`, {
            withCredentials: true,
        });
        dispatch({ type: 'deleteLectureSuccess', payload: data?.message });
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'deleteLectureFail', payload: error?.response?.data?.message });
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: 'getAllUsersRequest' });
        const { data } = await axios.get(`${server}/admin/users`, {
            withCredentials: true,
        });
        dispatch({ type: 'getAllUsersSuccess', payload: data?.users });
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'getAllUsersFail', payload: error?.response?.data?.message });
    }
}

export const updateUserRole = (userId, formData) => async (dispatch) => {
    try {
        dispatch({ type: 'updateUserRoleRequest' });
        const { data } = await axios.put(`${server}/admin/users/${userId}`, {}, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
        });
        dispatch({ type: 'updateUserRoleSuccess', payload: data?.message });
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'updateUserRoleFail', payload: error?.response?.data?.message });
    }
}

export const deleteUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteUserRequest' });
        const { data } = await axios.delete(`${server}/admin/users/${userId}`, {
            withCredentials: true,
        });
        dispatch({ type: 'deleteUserSuccess', payload: data?.message });
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'deleteUserFail', payload: error?.response?.data?.message });
    }
}

export const getDashboardDetails = () => async (dispatch) => {
    try {
        dispatch({ type: 'getAdminStatsRequest' });
        const { data } = await axios.get(`${server}/admin/stats`, {
            withCredentials: true,
        });
        dispatch({ type: 'getAdminStatsSuccess', payload: data });
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'getAdminStatsFail', payload: error?.response?.data?.message });
    }
}