import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const Guests = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Guests</h2>
            <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
                <label htmlFor="adultCount" className="text-gray-500 text-sm font-semibold flex-1">
                    Adults
                    <input
                        type="number"
                        className="border rounded w-full py-2 px-3 font-normal"
                        min={1}
                        {...register("adultCount", {
                            required: "Adults is required",
                        })}
                    />
                    {errors.adultCount && (
                        <span className="text-red-500 text-sm font-bold">{errors.adultCount.message}</span>
                    )}
                </label>

                <label htmlFor="childCount" className="text-gray-500 text-sm font-semibold flex-1">
                    Children
                    <input
                        type="number"
                        className="border rounded w-full py-2 px-3 font-normal"
                        min={0}
                        {...register("childCount", {
                            required: "Children is required",
                        })}
                    />
                    {errors.childCount && (
                        <span className="text-red-500 text-sm font-bold">{errors.childCount.message}</span>
                    )}
                </label>
            </div>
        </div>
    )
}

export default Guests