
import { useForm, FormProvider } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import Facilities from './Facilities';
import Guests from './Guests';
import ImagesSection from './ImagesSection';
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

type Props = {
  onSave: (hotelFormData: FormData) => void,
  isLoading: boolean,
}

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const methods = useForm<HotelFormData>();
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('description', formDataJson.description);
    formData.append('type', formDataJson.type);
    formData.append('pricePerNight', formDataJson.pricePerNight.toString());
    formData.append('starRating', formDataJson.starRating.toString());
    formData.append('adultCount', formDataJson.adultCount.toString());
    formData.append('childCount', formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility: string, index) => {
      formData.append(`facilities[${index}]`, facility);
    })

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    })
    onSave(formData)
    console.log(formData);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex flex-col gap-10">
        <DetailsSection />
        <TypeSection />
        <Facilities />
        <Guests />
        <ImagesSection />
        <span className="flex justify-end">
          <button type="submit" disabled={isLoading} className="bg-blue-600 text-white p-3 font-bold hover:bg-blue-500 text-xl disable:bg-gray-500">
            { isLoading ? 'Adding Hotel...': 'Add Hotel'}
          </button>
        </span>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm