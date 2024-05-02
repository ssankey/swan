import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const EquityChart = ({setReturnsData}) => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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
    } else {
      setFilteredData(data);
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
        
        drawdownValues.push(drawdown*200);
      } else {
        drawdownValues.push(undefined);
      }
    }
    return drawdownValues;
  };
  
  const drawdownValues = calculateDrawdown(filteredData);
  
console.log(drawdownValues)
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


  const calculatePeriodReturns = (navData) => {
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
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;
    const threeMonths = 90 * oneDay;
    const sixMonths = 180 * oneDay;
    const oneYear = 365 * oneDay;
    const threeYears = 3 * oneYear;
    const startIndexOfYear = navData.findIndex(item => new Date(item.x) >= new Date(today.getFullYear(), 0, 1));
  
    if (startIndexOfYear !== -1) {
      returns.ytd = ((navData[navData.length - 1].y - navData[startIndexOfYear].y) / navData[startIndexOfYear].y) * 100;
    }
  
    for (let i = navData.length - 1; i >= 0; i--) {
      const currentDate = new Date(navData[i].x);
      const oneDayAgo = new Date(currentDate.getTime() - oneDay);
      const oneWeekAgo = new Date(currentDate.getTime() - oneWeek);
      const oneMonthAgo = new Date(currentDate.getTime() - oneMonth);
      const threeMonthsAgo = new Date(currentDate.getTime() - threeMonths);
      const sixMonthsAgo = new Date(currentDate.getTime() - sixMonths);
      const oneYearAgo = new Date(currentDate.getTime() - oneYear);
      const threeYearsAgo = new Date(currentDate.getTime() - threeYears);
  
      if (i === navData.length - 1) {
        const periods = [
          { ago: oneDayAgo, key: 'oneDay' },
          { ago: oneWeekAgo, key: 'oneWeek' },
          { ago: oneMonthAgo, key: 'oneMonth' },
          { ago: threeMonthsAgo, key: 'threeMonths' },
          { ago: sixMonthsAgo, key: 'sixMonths' },
          { ago: oneYearAgo, key: 'oneYear' },
          { ago: threeYearsAgo, key: 'threeYears' },
        ];
  
        periods.forEach(period => {
          const index = navData.findIndex(item => new Date(item.x) <= period.ago);
          if (index !== -1) {
            returns[period.key] = ((navData[navData.length - 1].y - navData[index].y) / navData[index].y) * 100;
          }
        });
      }
    }

    
  
    return returns;
  };
  
  useEffect(() => {
    const newReturnsData = calculatePeriodReturns(filteredData); 
    if (Array.isArray(newReturnsData)) {
        setReturnsData(newReturnsData);
    } else {
        console.error('Expected an array from calculateReturns, received:', newReturnsData);
    }
}, [filteredData]); 



  return (
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
  );
};

export default EquityChart;