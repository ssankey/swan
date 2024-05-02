import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Dummy NAV data
const navData = [100, 98, 102, 105, 103, 107, 110, 112, 108, 106, 109, 111];
const startDate = new Date('2023-01-01');

function calculateDrawdown(navData) {
  let highWaterMark = navData[0];
  const drawdownValues = [];

  for (const nav of navData) {
    highWaterMark = Math.max(highWaterMark, nav);
    const drawdown = (nav - highWaterMark) / highWaterMark;
    drawdownValues.push(drawdown);
  }

  return drawdownValues;
}

const drawdownValues = calculateDrawdown(navData);


  
const data = navData.map((nav, index) => ({
  date: new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000), // Assuming daily NAV values
  nav,
  drawdown: drawdownValues[index],
}));

function DrawChart() {
  return (
    <LineChart width={800} height={400} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="nav" stroke="#8884d8" name="NAV" />
      <Line type="monotone" dataKey="drawdown" stroke="#82ca9d" name="Drawdown" />
    </LineChart>
  );
}

export default DrawChart;