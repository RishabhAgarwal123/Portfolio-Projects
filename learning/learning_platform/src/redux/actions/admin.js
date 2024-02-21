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
        dispatch({ type: 'createCourseSuccess', payload: data?.courses });
    } catch (error) {
        console.log(error.response)
        dispatch({ type: 'createCourseFail', payload: error?.response?.data?.message });
    }
}