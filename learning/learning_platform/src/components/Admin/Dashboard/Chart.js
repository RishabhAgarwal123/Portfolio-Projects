import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend
)

export const LineChart = ({ views = [] }) => {
    const labels = getLastYearMonth();
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Yearly Views'
            }
        }
    }
    const data = {
        labels,
        datasets: [
            {
                label: 'Views',
                data: views,
                borderColor: 'rgba(107, 70, 193, 0.5)',
                backgroundColor: '#6b46c1'
            }
        ]
    }
    return <Line options={options} data={data} />
}

export const DoughnutChart = ({ users = [] }) => {
    const labels = ['Subscribed', 'Not Subscribed'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Users',
                data: users,
                borderColor: ['rgb(62, 12, 171)', 'rgb(214, 43, 129)'],
                backgroundColor: ['rgba(62, 12, 171, .3)', 'rgba(214, 43, 129, .3)'],
                borderWidth: 1
            }
        ]
    }
    return <Doughnut data={data} />
}

function getLastYearMonth() {
    const labels = [];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    // Get the current month index (0-indexed)
    const currentMonthIndex = new Date().getMonth();

    // Start from the month before the current month
    let monthIndex = currentMonthIndex - 1;

    // Loop backwards for 12 months
    for (let i = 0; i < 12; i++) {
        if (monthIndex < 0) {
            monthIndex = 11; // Wrap around to December if monthIndex becomes negative
        }
        labels.unshift(months[monthIndex]); // Add the month to the beginning of the labels array
        monthIndex--; // Move to the previous month
    }

    return labels;
}