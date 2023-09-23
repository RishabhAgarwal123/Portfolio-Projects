import React from 'react'
import Navbar from './Navbar';
import './Dashboard.css';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { tasks } = useSelector(state => state.user);

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


    return (
        <>
            <Navbar />
            <div className='dashboard'>
                <h1>Tracking Daily Progress</h1>
                <div className='card-container'>
                    {
                        datesAndDays && datesAndDays.map((date, index) => {
                            return <div className="todo-list-card card" key={index}>
                                <div className="card-section">
                                    <div className='date-day'>
                                        <span>{date.day}</span>
                                        <span style={{textDecoration: 'underline'}}>{date.date}</span>
                                    </div>
                                    <div className='card-divider'></div>
                                    {
                                        tasks && tasks.map((task, index) => {
                                            return <ul key={index}>
                                                {task.completed && <li className='center-li border-green'>
                                                    <CheckCircleOutlinedIcon sx={{ color: 'green' }} />
                                                    <span>{task.taskName}</span>
                                                </li>}
                                                {!task.completed && <li className='center-li border-red'>
                                                    <CancelOutlinedIcon sx={{ color: 'red' }} />
                                                    <span>{task.taskName}</span>
                                                </li>}
                                            </ul>
                                        })
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Dashboard