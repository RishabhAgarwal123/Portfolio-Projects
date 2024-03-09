import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from '../api-client';
import React, { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";

const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities
    }

    const { data: hotelData } = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams))

    const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;
        setSelectedStars((prev) =>
            event.target.checked ? [...prev, starRating] : prev?.filter((star) => star !== starRating)
        )
    }

    const handleHotelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelType = event.target.value;
        setSelectedHotelTypes((prev) =>
            event.target.checked ? [...prev, hotelType] : prev?.filter((type) => type !== hotelType)
        )
    }

    const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const facilityType = event.target.value;
        setSelectedFacilities((prev) =>
            event.target.checked ? [...prev, facilityType] : prev?.filter((type) => type !== facilityType)
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter By:
                    </h3>
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarChange} />
                    <HotelTypesFilter selectedTypes={selectedHotelTypes} onChange={handleHotelChange} />
                    <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange} />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination?.totalPages} Hotels Found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                    {/* Sort options */}
                </div>
                {
                    hotelData?.data?.map((hotel, index) => (
                        <SearchResultsCard key={index} hotel={hotel} />
                    ))
                }
                <div>
                    <Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} onPageChange={setPage} />
                </div>
            </div>
        </div>
    )
}

export default Search