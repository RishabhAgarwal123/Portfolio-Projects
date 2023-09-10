/* eslint-disable react/prop-types */
const backgroundColors = [
    "bg-red-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-orange-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-gray-200",
    "bg-indigo-200",
    "bg-teal-200",
    "bg-cyan-200",
    "bg-lime-200",
    "bg-emerald-200",
    "bg-rose-200",
];

// eslint-disable-next-line react/prop-types
const Avatar = ({ online, userId, username }) => {
    const userIdBase10 = parseInt(userId, 16);
    const color = backgroundColors[userIdBase10 % backgroundColors.length];

    return (
        <div className={`w-8 h-8 relative ${color} rounded-full flex items-center justify-center opacity-70`}>
            <div>{username[0]?.toUpperCase()}</div>
            {
                online && (
                    <div className="absolute w-3 h-3 rounded-full bg-green-500 bottom-0 right-0 border border-white"></div>
                )
            }
            {
                !online && (
                    <div className="absolute w-3 h-3 rounded-full bg-gray-500 bottom-0 right-0 border border-white"></div>
                )
            }
        </div>
    )
}

export default Avatar