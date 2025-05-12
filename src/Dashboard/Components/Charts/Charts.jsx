import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
  } from "recharts";

export default function Charts() {
    
    const salesData = [
      { month: "January", Organic: 45, Paid: 22 },
      { month: "February", Organic: 50, Paid: 50 },
      { month: "March", Organic: 40, Paid: 65 },
      { month: "April", Organic: 55, Paid: 75 },
      { month: "May", Organic: 65, Paid: 50 },
      { month: "June", Organic: 70, Paid: 45 },
      { month: "July", Organic: 66, Paid: 60 },
    ];
    
    const pieData = [
      { name: "Men", value: 400 },
      { name: "Women", value: 300 },
      { name: "Kids", value: 200 },
    ];
    
    const COLORS = ["#3b82f6", "#06b6d4", "#8b5cf6"];
    

  return (
    <>
     <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Line Chart */}
          <div className="p-6 bg-gray-800 rounded-2xl">
            <h3 className="mb-4 text-xl font-semibold font-heading">User Analytics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line type="monotone" dataKey="Organic" stroke="#06B6D4" />
                <Line type="monotone" dataKey="Paid" stroke="#8B5CF6" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Donut Chart */}
          {/* Donut Chart Section */}
          <div className="p-6 bg-gray-800 rounded-2xl">
            <h3 className="mb-4 text-xl font-semibold font-heading">Revenue</h3>
            <div className="flex flex-col items-center justify-center gap-6">
              <ResponsiveContainer width={300} height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="flex gap-5">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm text-gray-600 font-body">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
