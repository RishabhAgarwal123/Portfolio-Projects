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
const Avatar = ({ userId, username }) => {
    const userIdBase10 = parseInt(userId, 16);
    const color = backgroundColors[userIdBase10 % backgroundColors.length];

    return (
        <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center opacity-70`}>
            {username[0]?.toUpperCase()}
        </div>
    )
}

export default Avatar