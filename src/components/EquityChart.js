import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const EquityChart = () => {
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
        item =>
          new Date(item.x) >= new Date(startDate) &&
          new Date(item.x) <= new Date(endDate)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [startDate, endDate, data]);

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
    ],
  };

  return (
    <div className="mt-4 chart-container">
      <div className="flex flex-col md:flex-row  md:justify-between items-center md:items-start">
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