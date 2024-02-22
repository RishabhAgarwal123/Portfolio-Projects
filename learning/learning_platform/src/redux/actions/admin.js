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
        const { data } = await axios.delete(`${server}/course/${courseId}`,  {
            withCredentials: true,
        });
        dispatch({ type: 'deleteCourseSuccess', payload: data?.message });
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'deleteCourseFail', payload: error?.response?.data?.message });
    }
}

export const deleteLecture = (courseId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteLectureRequest' });
        const { data } = await axios.delete(`${server}/course/${courseId}`,  {
            withCredentials: true,
        });
        dispatch({ type: 'deleteLectureSuccess', payload: data?.message });
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'deleteLectureFail', payload: error?.response?.data?.message });
    }
}