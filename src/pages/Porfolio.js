import React, { useState } from 'react';
import EquityChart from '../components/EquityChart';

const Portfolio = () => {
    const [returnsData, setReturnsData] = useState([]);
    return (
        <div className='bg-white p-5 md:p-10'>
            <h1 className='text-2xl'>Trailing Returns</h1>
            <div className="overflow-x-auto mt-5 mb-2">
                <table cellPadding={10} className='w-full'>
                    <thead>
                        <tr className='bg-gray-100 border-b-2 border-gray-200'>
                            <th className="p-2">Name</th>
                            <th className="p-2">YTD</th>
                            <th className="p-2">1D</th>
                            <th className="p-2">1W</th>
                            <th className="p-2">1M</th>
                            <th className="p-2">3M</th>
                            <th className="p-2">6M</th>
                            <th className="p-2">1Y</th>
                            <th className="p-2">3Y</th>
                            <th className="p-2 border-r-4">SI</th>
                            <th className="p-2">DD</th>
                            <th className="p-2">MAXDD</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-b border-gray-200'>
                            <td className="p-2">Focused</td>
                            <td className="p-2">-1.7%</td>
                            <td className="p-2">0.1%</td>
                            <td className="p-2">0.1%</td>
                            <td className="p-2">2.9%</td>
                            <td className="p-2">7.6%</td>
                            <td className="p-2">2.2%</td>
                            <td className="p-2">10.1%</td>
                            <td className="p-2">22.5%</td>
                            <td className="p-2 border-r-4">SI</td>
                            <td className="p-2">-2.8%</td>
                            <td className="p-2">-40.3</td>
                        </tr>
                        <tr className='border-b border-gray-200'>
                            <td className="p-2">NIFTY50</td>
                            <td className="p-2">-1.7%</td>
                            <td className="p-2">0.1%</td>
                            <td className="p-2">0.1%</td>
                            <td className="p-2">2.9%</td>
                            <td className="p-2">7.6%</td>
                            <td className="p-2">2.2%</td>
                            <td className="p-2">10.1%</td>
                            <td className="p-2">22.5%</td>
                            <td className="p-2 border-r-4">SI</td>
                            <td className="p-2">-2.8%</td>
                            <td className="p-2">-40.3</td>
                        </tr>

                        <tbody>
                            {returnsData.map((data, index) => (
                                <tr key={index} className='border-b border-gray-200'>
                                    <td className="p-2">{data.name || "Default Name"}</td>
                                    <td className="p-2">{data.ytd}%</td>
                                    <td className="p-2">{data.oneDay}%</td>
                                    <td className="p-2">{data.oneWeek}%</td>
                                    <td className="p-2">{data.oneMonth}%</td>
                                    <td className="p-2">{data.threeMonths}%</td>
                                    <td className="p-2">{data.sixMonths}%</td>
                                    <td className="p-2">{data.oneYear}%</td>
                                    <td className="p-2">{data.threeYears}%</td>
                                    <td className="p-2 border-r-4">{"SI"}</td>
                                    <td className="p-2">{data.dd}%</td>
                                    <td className="p-2">{data.maxDD}%</td>
                                </tr>
                            ))}
                        </tbody>

                    </tbody>
                </table>
            </div>
            <p className='text-xs text-gray-400'>Note: Returns above 1 year are annualised</p>
            <h1 className='text-2xl mt-8'>Equity curve</h1>
            <EquityChart setReturnsData={setReturnsData} />
            {console.log(returnsData)}
        </div>
    );
}

export default Portfolio;
