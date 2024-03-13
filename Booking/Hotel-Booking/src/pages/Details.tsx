import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from '../api-client';

const Details = () => {
    const { hotelId } = useParams();
    const { data: hotel } = useQuery("getHotelById", () => {
        apiClient.getHotelById(hotelId as string)
    }, {
        enabled: !!hotelId
    });
    return (
        <div className="space-y-6">
            <div>
                <span className="flex">
                    {
                        
                    }
                </span>
            </div>
        </div>
    )
}

export default Details