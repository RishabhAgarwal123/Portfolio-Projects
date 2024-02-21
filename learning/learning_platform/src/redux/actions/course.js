import axios from "axios";
import { server } from "../store";

export const getAllCourses = (category = '', keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: 'allCoursesRequest' });
        const { data } = await axios.get(`${server}/courses?keyword=${keyword}&category=${category}`);
        dispatch({ type: 'allCoursesSuccess', payload: data?.courses });
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'allCoursesFail', payload: error?.response?.data?.message });
    }
}

export const getCourseLectures = (courseId) => async (dispatch) => {
    try {
        dispatch({ type: 'getCoursesRequest' });
        const { data } = await axios.get(`${server}/course/${courseId}`, {
            withCredentials: true,
        });
        dispatch({ type: 'getCoursesSuccess', payload: data?.lectures });
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'getCoursesFail', payload: error?.response?.data?.message });
    }
}