import { useSearchContext } from "../contexts/SearchContext"
import { useState, FormEvent } from 'react';
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker';

const SearchBar = () => {
    const search = useSearchContext();

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);
    // const [hotelId, setHotelId] = useState<string>('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
    }

    return (
        <form className="-mt-8 p-3 bg-orange-400 rounded shadow-mg grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 items-center gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-row items-center flex-1 bg-white p-2">
                <MdTravelExplore size={25} className="mr-2" />
                <input
                    type="text"
                    placeholder="Enter your destination?"
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
                <DatePicker />
            </div>
        </form>
    )
}

export default SearchBar