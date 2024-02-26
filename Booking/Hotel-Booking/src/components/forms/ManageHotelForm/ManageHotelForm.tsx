
import { useForm, FormProvider } from 'react-hook-form';
import DetailsSection from './DetailsSection';

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: File[];
  imageUrls: string[];
  adultCount: number;
  childCount: number;
}

const ManageHotelForm = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form>
        <DetailsSection />
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm