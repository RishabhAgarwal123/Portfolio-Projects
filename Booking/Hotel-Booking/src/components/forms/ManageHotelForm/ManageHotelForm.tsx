
import { useForm, FormProvider } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';

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
  const methods = useForm<HotelFormData>();

  return (
    <FormProvider {...methods}>
      <form className="mt-4">
        <DetailsSection />
        <TypeSection />
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm