
import React from 'react';
import { hotelTypes } from '../config/hotel-options-config';

type Props = {
    selectedTypes: string[],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const HotelTypesFilter = ({ selectedTypes, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-2">
            <h4 className="text-md font-semibold mb-2">Facilities</h4>
            {
                hotelTypes?.map((type, index) => (
                    <label key={index} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            value={type || ''}
                            className="rounded"
                            checked={selectedTypes?.includes(type)}
                            onChange={(e) => onChange(e)}
                        />
                        <span>{type}</span>
                    </label>
                ))
            }
        </div>
    )
}

export default HotelTypesFilter