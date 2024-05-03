import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
const Portfolio = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [returns, setReturns] = useState({});
    useEffect(() => {
        fetch('/React Assignment Historical NAV Report.xlsx')
            .then(res => res.arrayBuffer())
            .then(buffer => {
                const workbook = XLSX.read(buffer, { type: 'buffer' });
                const worksheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetName];
                const range = XLSX.utils.decode_range(worksheet['!ref']);
                range.s.r = 5;
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    range,
                    header: ["NAV Date", "NAV (Rs)"],
                    blankrows: false,
                });
                const formattedData = jsonData.map(item => ({
                    x: item['NAV Date'],
                    y: Math.trunc(item['NAV (Rs)']),
                }));
                setData(formattedData);
                setFilteredData(formattedData);
            })
            .catch(error => console.error('Error reading the Excel file: ', error));
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
            const filtered = data.filter(
                item => new Date(item.x) >= new Date(startDate) && new Date(item.x) <= new Date(endDate)
            );
            setFilteredData(filtered);
            calculateReturns(filtered);
        } else {
            setFilteredData(data);
            calculateReturns(data);
        }
    }, [startDate, endDate, data]);

    const calculateDrawdown = (navData) => {
        let highWaterMark = navData.length > 0 ? navData[0].y : 0;
        const drawdownValues = [];

        console.log(navData)

        for (const { y } of navData) {
            if (y !== undefined) {
                highWaterMark = Math.max(highWaterMark, y);
                const drawdown = highWaterMark !== 0 ? (y - highWaterMark) / highWaterMark : 0;

                drawdownValues.push(drawdown * 200);
            } else {
                drawdownValues.push(undefined);
            }
        }
        return drawdownValues;
    };
    const drawdownValues = calculateDrawdown(filteredData);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Equity Curve',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
                grid: {
                    color: "rgba(0, 0, 0, 0)",
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'NAV (Rs)',
                },
                

            },
        },
    };

    const chartData = {
        labels: filteredData.map(item => item.x).reverse(),
        datasets: [
            {
                label: 'NAV (Rs)',
                data: filteredData.map(item => item.y).reverse(),
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                pointRadius: 0,
            },
            {
                label: 'Drawdown',
                data: drawdownValues.reverse(),
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 0,
                yAxisID: 'y'
            },
        ],
    };

    const calculateReturns = (navData) => {
        const returns = {
            ytd: null,
            oneDay: null,
            oneWeek: null,
            oneMonth: null,
            threeMonths: null,
            sixMonths: null,
            oneYear: null,
            threeYears: null,
        };
    
        const today = new Date();
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    
        // More accurate date periods calculation
        const oneWeek = 7 * oneDay;
        const oneMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        const threeMonths = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
        const sixMonths = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
        const oneYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        const threeYears = new Date(today.getFullYear() - 3, today.getMonth(), today.getDate());
    
        const startIndexOfYear = navData.findIndex(
            (item) => new Date(item.x) >= new Date(today.getFullYear(), 0, 1)
        );
    
        if (startIndexOfYear !== -1) {
            const startOfYearNav = navData[startIndexOfYear].y;
            const lastNav = navData[navData.length - 1].y;
            returns.ytd = ((lastNav - startOfYearNav) / startOfYearNav) * 100;
        }
    
        const lastNavDate = new Date(navData[navData.length - 1].x);
        const periods = [
            { ago: new Date(lastNavDate.getTime() - oneDay), key: 'oneDay' },
            { ago: new Date(lastNavDate.getTime() - oneWeek), key: 'oneWeek' },
            { ago: oneMonth, key: 'oneMonth' },
            { ago: threeMonths, key: 'threeMonths' },
            { ago: sixMonths, key: 'sixMonths' },
            { ago: oneYear, key: 'oneYear' },
            { ago: threeYears, key: 'threeYears' },
        ];
    
        periods.forEach(period => {
    const index = navData.findIndex(item => item.x && new Date(item.x).toDateString() <= period.ago.toDateString());

    if (index !== -1) {
        returns[period.key] = ((navData[navData.length - 1].y - navData[index].y) / navData[index].y) * 100;
    }
});
    
        setReturns(returns);
    };
    
    return (
        <div className='bg-white p-5 md:p-10'>
            <h1 className='text-2xl'>Trailing Returns</h1>
            <div className="overflow-x-auto mt-5 mb-2">
                <table cellPadding={10} className='w-full'>
                    <thead>
                        <tr className='bg-gray-100 border-b-2 border-gray-200'>
                            <th className="p-2 text-center">Name</th>
                            <th className="p-2 text-center">YTD</th>
                            <th className="p-2 text-center">1D</th>
                            <th className="p-2 text-center">1W</th>
                            <th className="p-2 text-center">1M</th>
                            <th className="p-2 text-center">3M</th>
                            <th className="p-2 text-center">6M</th>
                            <th className="p-2 text-center">1Y</th>
                            <th className="p-2 text-center">3Y</th>
                            <th className="p-2 text-center border-r-4">SI</th>
                            <th className="p-2 text-center">DD</th>
                            <th className="p-2 text-center">MAXDD</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-b border-gray-200'>
                            <td className="p-2 text-center">Mutual Funds(NAV)</td>
                            <td className="p-2 text-center">{returns.ytd ? `${returns.ytd.toFixed(2)}%` : '-'}</td>
                            <td className="p-2 text-center">{returns.oneDay ? `${returns.oneDay.toFixed(2)}%` : '-'}</td>
                            <td className="p-2 text-center">{returns.oneWeek ? `${returns.oneWeek.toFixed(2)}%` : '-'}</td>
                            <td className="p-2 text-center">{returns.oneMonth ? `${returns.oneMonth.toFixed(2)}%` : '-'}</td>
                            <td className="p-2 text-center">{returns.threeMonths ? `${returns.threeMonths.toFixed(2)}%` : '-'}</td>
                            <td className="p-2 text-center">{returns.sixMonths ? `${returns.sixMonths.toFixed(2)}%` : '-'}</td>
                            <td className="p-2 text-center">{returns.oneYear ? `${returns.oneYear.toFixed(2)}%` : '-'}</td>
                            <td className="p-2 text-center">{returns.threeYears ? `${returns.threeYears.toFixed(2)}%` : '-'}</td>
                            <td className="p-2 text-center border-r-4">SI</td>
                            <td className="p-2 text-center">-2.8%</td>
                            <td className="p-2 text-center">-40.3</td>
                        </tr>
                        <tr className='border-b border-gray-200'>
                            <td className="p-2 text-center">NIFTY50</td>
                            <td className="p-2 text-center">-1.7%</td>
                            <td className="p-2 text-center">0.1%</td>
                            <td className="p-2 text-center">0.1%</td>
                            <td className="p-2 text-center">2.9%</td>
                            <td className="p-2 text-center">7.6%</td>
                            <td className="p-2 text-center">2.2%</td>
                            <td className="p-2 text-center">10.1%</td>
                            <td className="p-2 text-center">22.5%</td>
                            <td className="p-2 text-center border-r-4">SI</td>
                            <td className="p-2 text-center">-2.8%</td>
                            <td className="p-2 text-center">-40.3</td>
                        </tr>

                        <tbody>

                        </tbody>

                    </tbody>
                </table>
            </div>
            <p className='text-xs text-gray-400'>Note: Returns above 1 year are annualised</p>
            <h1 className='text-2xl mt-8'>Equity curve</h1>
            <div className="mt-4 chart-container">
                <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start">
                    <p className="text-xs">Live since 2019-05-25</p>
                    <div className="flex flex-col md:flex-row items-start">
                        <div>
                            <h1>From Date</h1>
                            <input
                                className="border rounded-md p-2"
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <h1>To Date</h1>
                            <input
                                className="border rounded-md p-2"
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="chart-container relative h-[400px]">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
}

export default Portfolio;
