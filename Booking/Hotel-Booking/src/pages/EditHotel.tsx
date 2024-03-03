import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import * as apiClient from '../api-client';
import ManageHotelForm from '../components/forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext';

const EditHotel = () => {
    const { hotelId } = useParams()
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data: hotel } = useQuery("getMyHotelById", ()  => apiClient.getMyHotelById(hotelId || ''), {
        enabled: !!hotelId,
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' })
        },
    })

    const { mutate, isLoading } = useMutation(apiClient.editMyHotel, {
        onSuccess: async () => {
            showToast({ message: 'Hotel Edited Successfully!', type: 'SUCCESS' });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' })
        },
    });

    const editHotel = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    }

    if (!hotel) {
        return <span className="text-3xl font-bold">No Hotels Found</span>
    }
  return (
    <ManageHotelForm hotel={hotel} onSave={editHotel} isLoading={isLoading} />
  )
}

export default EditHotel