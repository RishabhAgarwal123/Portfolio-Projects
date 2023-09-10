/* eslint-disable react/prop-types */
import Avatar from "./Avatar"

const Person = ({ id, selected, onClick, username, online }) => {
    return (
        <div
            className={
                `border-b border-gray-100 flex cursor-pointer items-center
            ${selected ? 'bg-blue-50' : ''}`}
            key={id}
            onClick={() => onClick(id)}
        >
            {selected && (
                <div className="w-1 bg-blue-500 h-12"></div>
            )}
            <div className="py-2 pl-4 flex items-center rounded-r-md gap-2">
                <Avatar online={online} userId={id} username={username?.split('')[0].toUpperCase() + username?.slice(1).split('').join('')} />
                <span className="text-gray-800">{username?.split('')[0].toUpperCase() + username?.slice(1).split('').join('')}</span>
            </div>
        </div>
    )
}

export default Person