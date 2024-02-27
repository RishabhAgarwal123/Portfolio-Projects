import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
            <label htmlFor="name" className="text-gray-500 text-sm font-bold flex-1">
                Name
                <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("name", {
                        required: "Name is required",
                    })}
                />
                {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                )}
            </label>

            <div className="flex gap-4">
                <label htmlFor="city" className="text-gray-500 text-sm font-bold flex-1">
                    City
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("city", {
                            required: "City is required",
                        })}
                    />
                    {errors.city && (
                        <span className="text-red-500">{errors.city.message}</span>
                    )}
                </label>
                <label htmlFor="country" className="text-gray-500 text-sm font-bold flex-1">
                    Country
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("country", {
                            required: "Country is required",
                        })}
                    />
                    {errors.country && (
                        <span className="text-red-500">{errors.country.message}</span>
                    )}
                </label>
            </div>

            <label htmlFor="description" className="text-gray-500 text-sm font-bold flex-1">
                Description
                <textarea
                    rows={5}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("description", {
                        required: "Description is required",
                    })}
                />
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                )}
            </label>

            <label htmlFor="pricePerNight" className="text-gray-500 text-sm font-bold max-w-[50%]">
                Price Per Night
                <input
                    type="number"
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("pricePerNight", {
                        required: "Price Per Night is required",
                    })}
                />
                {errors.pricePerNight && (
                    <span className="text-red-500">{errors.pricePerNight.message}</span>
                )}
            </label>

            <label htmlFor="starRating" className="text-gray-500 text-sm font-bold max-w-[50%]">
                Star Rating
                <select {...register("starRating", {
                    required: 'Star Rating is required'
                })} name="starRating" id="starRating" className="border rounded w-full p-2 text-gray-700 font-normal">
                    <option value="" className="text-sm font-bold">
                        Select a Rating
                    </option>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>

                {errors.starRating && (
                    <span className="text-red-500">{errors.starRating.message}</span>
                )}
            </label>
        </div>
    )
}

export default DetailsSection