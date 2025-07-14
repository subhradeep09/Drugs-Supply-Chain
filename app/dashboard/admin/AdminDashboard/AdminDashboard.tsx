"use client";

import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { WelcomeBanner } from './WelcomeBanner';
import { QuickStatsCards } from './QuickStatsCards';
import { PriorityAlerts } from './PriorityAlerts';

const AdminDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [timeRange, setTimeRange] = useState("monthly");

  const updateCharts = (range: string) => {
    setTimeRange(range);
    const deliveryTimeChart = echarts.getInstanceByDom(
      document.getElementById("delivery-time-chart") as HTMLElement
    );
    const delaysChart = echarts.getInstanceByDom(
      document.getElementById("delays-chart") as HTMLElement
    );

    if (deliveryTimeChart && delaysChart) {
      // Update delivery time chart data based on range
      const deliveryData =
        range === "weekly"
          ? [3.2, 3.8, 4.1, 3.5, 3.9, 3.2, 3.7]
          : range === "monthly"
            ? [4.2, 3.8, 5.1, 3.5, 4.0, 3.2, 3.9]
            : [4.5, 4.2, 3.9, 4.1, 3.8, 4.3, 4.0];

      deliveryTimeChart.setOption({
        series: [
          {
            data: deliveryData,
          },
        ],
      });

      // Update delays chart data based on range
      const delaysData =
        range === "weekly"
          ? [
              { value: 90, name: "On Time" },
              { value: 7, name: "Delayed" },
              { value: 3, name: "Failed" },
            ]
          : range === "monthly"
            ? [
                { value: 85, name: "On Time" },
                { value: 10, name: "Delayed" },
                { value: 5, name: "Failed" },
              ]
            : [
                { value: 82, name: "On Time" },
                { value: 12, name: "Delayed" },
                { value: 6, name: "Failed" },
              ];

      delaysChart.setOption({
        series: [
          {
            data: delaysData,
          },
        ],
      });
    }
  };

  // Initialize charts after component mounts
  useEffect(() => {
    // Delivery Time Chart
    const deliveryTimeChart = echarts.init(
      document.getElementById("delivery-time-chart") as HTMLElement
    );
    const deliveryTimeOption = {
      animation: false,
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
        name: "Hours",
      },
      series: [
        {
          name: "Average Delivery Time",
          type: "line",
          data: [4.2, 3.8, 5.1, 3.5, 4.0, 3.2, 3.9],
          smooth: true,
          lineStyle: {
            color: "#1E40AF",
          },
          itemStyle: {
            color: "#1E40AF",
          },
        },
      ],
    };
    deliveryTimeChart.setOption(deliveryTimeOption);

    // Delays Chart
    const delaysChart = echarts.init(
      document.getElementById("delays-chart") as HTMLElement
    );
    const delaysOption = {
      animation: false,
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "2%",
        left: "center",
      },
      series: [
        {
          name: "Delivery Status",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "14",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 85, name: "On Time", itemStyle: { color: "#10B981" } },
            { value: 10, name: "Delayed", itemStyle: { color: "#F59E0B" } },
            { value: 5, name: "Failed", itemStyle: { color: "#EF4444" } },
          ],
        },
      ],
    };
    delaysChart.setOption(delaysOption);

    // Handle resize
    const handleResize = () => {
      deliveryTimeChart.resize();
      delaysChart.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      deliveryTimeChart.dispose();
      delaysChart.dispose();
    };
  }, []);

  return (
    <main className="pt-20 px-6 pb-8">
      <WelcomeBanner />
      <QuickStatsCards />
      <PriorityAlerts />

      {/* Rest of the content remains the same */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Hospital Requests Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Hospital Requests
              </h2>
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-blue-600 cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-filter"></i>
                </button>
                <button className="text-gray-500 hover:text-blue-600 cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-download"></i>
                </button>
                <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-100 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Generator */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              Reports Generator
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <div className="relative">
                <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option>Inventory Status</option>
                  <option>Delivery Performance</option>
                  <option>Hospital Requests</option>
                  <option>Stock Alerts</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="date"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  />
                </div>
                <div className="relative">
                  <input
                    type="date"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="format-pdf"
                    name="format"
                    type="radio"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    defaultChecked
                  />
                  <label
                    htmlFor="format-pdf"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    PDF
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="format-excel"
                    name="format"
                    type="radio"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="format-excel"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Excel
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="format-csv"
                    name="format"
                    type="radio"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="format-csv"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    CSV
                  </label>
                </div>
              </div>
            </div>
            <div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                Generate Report
              </button>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Recent Reports
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <div className="flex items-center">
                  <i className="fas fa-file-pdf text-red-500 mr-2"></i>
                  <span className="text-sm text-gray-600">
                    Inventory_Jun_21.pdf
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-download text-sm"></i>
                </button>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center">
                  <i className="fas fa-file-excel text-green-500 mr-2"></i>
                  <span className="text-sm text-gray-600">
                    Deliveries_Jun_20.xlsx
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-download text-sm"></i>
                </button>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center">
                  <i className="fas fa-file-csv text-blue-500 mr-2"></i>
                  <span className="text-sm text-gray-600">
                    Requests_Jun_19.csv
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-download text-sm"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Vendor Performance Monitor */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8">
                <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Vendor Performance Monitor
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => updateCharts("weekly")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition duration-200 cursor-pointer !rounded-button whitespace-nowrap ${
                  timeRange === "weekly"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => updateCharts("monthly")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition duration-200 cursor-pointer !rounded-button whitespace-nowrap ${
                  timeRange === "monthly"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => updateCharts("yearly")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition duration-200 cursor-pointer !rounded-button whitespace-nowrap ${
                  timeRange === "yearly"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Average Delivery Times
            </h3>
            <div id="delivery-time-chart" className="h-64 w-full"></div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Delivery Status
            </h3>
            <div id="delays-chart" className="h-64 w-full"></div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-gray-600">On Time: 85%</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-xs text-gray-600">Delayed: 10%</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-xs text-gray-600">Failed: 5%</span>
              </div>
            </div>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap">
              View Detailed Report
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;