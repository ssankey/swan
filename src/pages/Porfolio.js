import React from 'react'
import EquityChart from '../components/EquityChart'
const Porfolio = () => {
    return (
        <div className='bg-white p-10'>
            <h1 className='text-2xl'>Trailing Returns</h1>
            <table cellPadding={10} className='w-full mt-5 mb-2'>
                <tr className='bg-gray-100 border border-b-2'>
                    <td>Name</td>
                    <td>YTD</td>
                    <td>1D</td>
                    <td>1W</td>
                    <td>1M</td>
                    <td>3M</td>
                    <td>6M</td>
                    <td>1Y</td>
                    <td>3Y</td>
                    <td className='border-r-4'>SI</td>
                    <td >DD</td>
                    <td>MAXDD</td>
                </tr>
                <tr className='border-b-2'>
                    <td>Focused</td>
                    <td>-1.7%</td>
                    <td>0.1%</td>
                    <td>0.1%</td>
                    <td>2.9%</td>
                    <td>7.6%</td>
                    <td>2.2%</td>
                    <td>10.1%</td>
                    <td>22.5%</td>
                    <td className='border-r-4'>SI</td>
                    <td>-2.8%</td>
                    <td>-40.3</td>
                </tr>
                <tr className='border-b-2'>
                    <td>NIFTY50</td>
                    <td>-1.7%</td>
                    <td>0.1%</td>
                    <td>0.1%</td>
                    <td>2.9%</td>
                    <td>7.6%</td>
                    <td>2.2%</td>
                    <td>10.1%</td>
                    <td>22.5%</td>
                    <td className='border-r-4'>SI</td>
                    <td>-2.8%</td>
                    <td>-40.3</td>
                </tr>
            </table>
            <p className='text-xs text-gray-400'>Note : Returns above 1 year are annualised</p>
            <h1 className='text-2xl mt-8'>Equity curve</h1>
            <EquityChart />

        </div>
    )
}

export default Porfolio