import { useSearchContext } from "../contexts/SearchContext"
import { useState, FormEvent } from 'react';
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const navigate = useNavigate();
    const search = useSearchContext();

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
        navigate("/search");
    }

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <form className="-mt-8 p-3 bg-orange-400 rounded shadow-mg grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 items-center gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-row items-center flex-1 bg-white p-2">
                <MdTravelExplore size={25} className="mr-2" />
                <input
                    type="text"
                    placeholder="Enter your destination"
                    className="text-md w-full focus:outline-none"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)} />
            </div>

            <div className="flex bg-white px-2 py-1 gap-2">
                <label htmlFor="adult" className="items-center flex">
                    Adults:
                    <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={1}
                        max={20}
                        value={adultCount}
                        onChange={(e) => setAdultCount(parseInt(e.target.value))}
                    />
                </label>

                <label htmlFor="children" className="items-center flex">
                    Children:
                    <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={0}
                        max={20}
                        value={childCount}
                        onChange={(e) => setChildCount(parseInt(e.target.value))}
                    />
                </label>
            </div>

            <div>
                <DatePicker
                    selected={checkIn}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-In Date"
                    className="min-w-full bg-white p-2 focus:outline-none"
                    wrapperClassName="min-w-full"
                    onChange={(date) => setCheckIn(date as Date)} />
            </div>

            <div>
                <DatePicker
                    selected={checkOut}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-Out Date"
                    className="min-w-full bg-white p-2 focus:outline-none"
                    wrapperClassName="min-w-full"
                    onChange={(date) => setCheckOut(date as Date)} />
            </div>

            <div className="flex gap-1">
                <button className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-400">
                    Search
                </button>
                <button className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-400">
                    Clear
                </button>
            </div>
        </form>
    )
}

export default SearchBar