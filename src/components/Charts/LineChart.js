import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

function LineChart({ chartData }) {
    const currentYear = new Date().getFullYear();
    return (
        <div className='col-span-2 lg:col-span-1 mt-4 bg-slate-50 lg:p-6 rounded-md shadow-sm'>
            <Line
                data={chartData}
                options={
                    {
                        plugins: {
                            title: {
                                display: true,
                                text: `No. of leads generated this year (${currentYear})`
                            },
                            legend: {
                                display: true,
                                position: 'bottom'
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                }
                            },
                            // y: {
                            //     grid: {
                            //         display: false
                            //     }
                            // }
                        }
                    }
                }
            />
        </div>
    )
}

export default LineChart