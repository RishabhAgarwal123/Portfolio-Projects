import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelTypes } from "../../../config/hotel-options-config";

const TypeSection = () => {
    const { register, watch, formState: { errors } } = useFormContext<HotelFormData>();
    const typeWatch = watch('type');
    const style = 'cursor-pointer text-sm rounded-full px-4 py-2 font-semibold'

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Hotel Type</h2>
            <div className="grid grid-cols-5 gap-2">
                {hotelTypes?.map((type, index) => (
                    <label htmlFor={`type-${index}`} key={index} className={
                        typeWatch === type
                            ? `${style} bg-blue-400`
                            : `${style} bg-gray-300`
                    }>
                        <input
                            type="radio"
                            id={`type-${index}`}
                            value={type}
                            {...register("type", { required: "Hotel Type is required" })}
                            className="hidden"
                        />
                        <span>{type}</span>
                    </label>
                ))}
                {errors.type && (
                    <span className="text-red-500 text-sm font-bold">{errors.type.message}</span>
                )}
            </div>
        </div>
    );
};

export default TypeSection;