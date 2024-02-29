import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const Facilities = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            <div className="grid grid-cols-5 gap-2">
                {
                    hotelFacilities?.map((facility, index) => (
                        <label htmlFor={`facility-${index}`} key={index} className="text-sm flex gap-2 text-gray-700 items-center">
                            <input
                                type="checkbox"
                                value={facility}
                                {...register("facilities", {
                                    validate: (facilities: any) => {
                                        if (facilities && facilities?.length > 0) return true;
                                        else return "At least one facility is required"
                                    }
                                })} />
                            {facility}
                        </label>
                    ))
                }
            </div>
            {errors.facilities && (
                <span className="text-red-500 text-sm font-bold">{errors.facilities.message}</span>
            )}
        </div>
    )
}

export default Facilities