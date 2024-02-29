import { useMutation, useQueryClient } from "react-query"
import ManageHotelForm from "../components/forms/ManageHotelForm/ManageHotelForm"
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        onSuccess: async () => {
            showToast({ message: 'Hotel Added Successfully!', type: 'SUCCESS' });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' })
        },
    });

    const addHotel = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    }

    return (
        <ManageHotelForm onSave={addHotel} />
    )
}

export default AddHotel