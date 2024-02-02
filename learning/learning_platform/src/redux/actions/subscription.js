import axios from "axios";
import { server } from "../store";

export const buySubscription = () => async (dispatch) => {
    try {
        dispatch({ type: 'buySubscriptionRequest' });
        const { data } = await axios.get(`${server}/subscribe`, {
            withCredentials: true,
        });
        dispatch({ type: 'buySubscriptionSuccess', payload: data?.subscriptionId });
    } catch (error) {
        dispatch({ type: 'buySubscriptionFail', payload: error?.response?.data?.message });
    }
}