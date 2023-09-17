import React from 'react'
import Navbar from './Navbar';
import './Dashboard.css';

const tasks = [
    { checked: true, taskName: 'Revision' },
    { checked: false, taskName: 'Netflix' },
    { checked: true, taskName: 'Coding' },
    { checked: true, taskName: 'Upskill' },
    { checked: false, taskName: 'Reels' },
    { checked: true, taskName: 'Office Work' },
    { checked: false, taskName: 'Gym' },
]

const Dashboard = () => {
    function getDatesRange() {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();
        const datesRange = [];

        // Generate dates for 3 days back
        for (let i = 3; i >= 1; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);

            const dayOfWeek = daysOfWeek[date.getDay()];
            const formattedDate = date.toLocaleDateString();

            datesRange.push({ date: formattedDate, day: dayOfWeek });
        }

        // Add today
        const dayOfWeek = daysOfWeek[today.getDay()];
        const formattedDate = today.toLocaleDateString();
        datesRange.push({ date: formattedDate, day: dayOfWeek });

        // Generate dates for 3 days forward
        for (let i = 1; i <= 3; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            const dayOfWeek = daysOfWeek[date.getDay()];
            const formattedDate = date.toLocaleDateString();

            datesRange.push({ date: formattedDate, day: dayOfWeek });
        }

        return datesRange;
    }

    const datesAndDays = getDatesRange();
    console.log(datesAndDays);


    return (
        <>
            <Navbar />
            <div className='dashboard'>
                <h1>Tracking Daily Progress</h1>
                <div className='cardContainer'>
                    {
                        datesAndDays && datesAndDays.map((date) => {
                            return <div className="book" key={date.day}>
                                {
                                    tasks.map((task) => {
                                        return <>
                                            <div className='todo'>
                                                <div className="checkbox-wrapper taskStatus">
                                                    <div>
                                                        <input type="checkbox" />
                                                        <svg viewBox="0 0 35.6 35.6">
                                                            <circle r="5" cy="5" cx="5" className="background"></circle>
                                                            <circle r="5" cy="5" cx="5" className="stroke"></circle>
                                                            <polyline points="11.78 18.12 15.55 22.23 25.17 12.87" className="check"></polyline>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className='taskName'>{task.taskName}</div>
                                            </div>
                                        </>
                                    })
                                }
                                {/* <div className="cover">
                                    <p>{date.date}</p>
                                    <p>{date.day}</p>
                                </div> */}
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Dashboard