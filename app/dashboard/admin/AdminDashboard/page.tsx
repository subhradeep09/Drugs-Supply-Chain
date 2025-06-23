'use client';

import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';

const AdminDashboardPage: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [currentPage, setCurrentPage] = useState(1);
  const [timeRange, setTimeRange] = useState('monthly');

  const updateCharts = (range: string) => {
    setTimeRange(range);
    const deliveryTimeChart = echarts.getInstanceByDom(
      document.getElementById('delivery-time-chart') as HTMLElement
    );
    const delaysChart = echarts.getInstanceByDom(
      document.getElementById('delays-chart') as HTMLElement
    );

    if (deliveryTimeChart && delaysChart) {
      // Update delivery time chart data based on range
      const deliveryData =
        range === 'weekly'
          ? [3.2, 3.8, 4.1, 3.5, 3.9, 3.2, 3.7]
          : range === 'monthly'
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
        range === 'weekly'
          ? [
              { value: 90, name: 'On Time' },
              { value: 7, name: 'Delayed' },
              { value: 3, name: 'Failed' },
            ]
          : range === 'monthly'
          ? [
              { value: 85, name: 'On Time' },
              { value: 10, name: 'Delayed' },
              { value: 5, name: 'Failed' },
            ]
          : [
              { value: 82, name: 'On Time' },
              { value: 12, name: 'Delayed' },
              { value: 6, name: 'Failed' },
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
      document.getElementById('delivery-time-chart') as HTMLElement
    );
    const deliveryTimeOption = {
      animation: false,
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
        name: 'Hours',
      },
      series: [
        {
          name: 'Average Delivery Time',
          type: 'line',
          data: [4.2, 3.8, 5.1, 3.5, 4.0, 3.2, 3.9],
          smooth: true,
          lineStyle: {
            color: '#1E40AF',
          },
          itemStyle: {
            color: '#1E40AF',
          },
        },
      ],
    };
    deliveryTimeChart.setOption(deliveryTimeOption);

    // Delays Chart
    const delaysChart = echarts.init(
      document.getElementById('delays-chart') as HTMLElement
    );
    const delaysOption = {
      animation: false,
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '2%',
        left: 'center',
      },
      series: [
        {
          name: 'Delivery Status',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '14',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 85, name: 'On Time', itemStyle: { color: '#10B981' } },
            { value: 10, name: 'Delayed', itemStyle: { color: '#F59E0B' } },
            { value: 5, name: 'Failed', itemStyle: { color: '#EF4444' } },
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
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      deliveryTimeChart.dispose();
      delaysChart.dispose();
    };
  }, []);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationOpen) setIsNotificationOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'Local' : 'EN');
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 ${
        isDarkMode ? 'dark:bg-gray-900 dark:text-white' : ''
      }`}
    >
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 flex items-center justify-between px-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-hospital-alt text-2xl text-blue-800"></i>
            <h1 className="text-xl font-semibold text-blue-800">
              GovMed Supply Chain
            </h1>
          </div>
        </div>
        <div className="flex-1 max-w-xl mx-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search drugs, hospitals, orders..."
              className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleLanguage}
            className="text-gray-600 hover:text-blue-700 cursor-pointer !rounded-button whitespace-nowrap"
          >
            {language}
          </button>
          <button
            onClick={toggleDarkMode}
            className="text-gray-600 hover:text-blue-700 cursor-pointer !rounded-button whitespace-nowrap"
          >
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
          </button>
          <div className="relative">
            <button
              onClick={toggleNotification}
              className="text-gray-600 hover:text-blue-700 cursor-pointer !rounded-button whitespace-nowrap"
            >
              <i className="fas fa-bell text-xl"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                4
              </span>
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                <h3 className="px-4 py-2 font-medium text-gray-700 border-b">
                  Notifications
                </h3>
                <div className="max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
                        <i className="fas fa-exclamation-triangle text-red-500"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Low stock alert: Amoxicillin
                        </p>
                        <p className="text-xs text-gray-500">10 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2">
                        <i className="fas fa-clock text-yellow-500"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Delivery delayed: Order #4582
                        </p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                        <i className="fas fa-check text-green-500"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Request approved: Central Hospital
                        </p>
                        <p className="text-xs text-gray-500">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                        <i className="fas fa-truck text-blue-500"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          New delivery: Order #4581
                        </p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer !rounded-button whitespace-nowrap">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 cursor-pointer !rounded-button whitespace-nowrap"
            >
              <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
                <span className="text-sm font-medium">JD</span>
              </div>
              <span className="text-sm font-medium text-gray-700">John Doe</span>
              <i className="fas fa-chevron-down text-xs text-gray-500"></i>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                <a
                  href="#profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </a>
                <a
                  href="#settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="#help"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Help Center
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <a
                  href="#logout"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-6 pb-8">
        {/* Welcome Banner */}
        <div className="mb-8 bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl overflow-hidden shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="p-8 md:w-1/2">
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome back, John!
              </h2>
              <p className="text-blue-100 mb-6">
                Today is June 22, 2025. You have 4 pending approvals and 3
                critical alerts.
              </p>
              <button className="bg-white text-blue-800 px-6 py-2 rounded-lg font-medium shadow-md hover:bg-blue-50 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                View Alerts
              </button>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-blue-700"></div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm">Total Drugs in Inventory</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">1,248</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <i className="fas fa-pills text-blue-600"></i>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 flex items-center text-sm font-medium">
                <i className="fas fa-arrow-up mr-1"></i> 12%
              </span>
              <span className="text-gray-400 text-sm ml-2">from last month</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full mt-4">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm">Pending Hospital Requests</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">42</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <i className="fas fa-hospital-user text-yellow-600"></i>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-red-500 flex items-center text-sm font-medium">
                <i className="fas fa-arrow-up mr-1"></i> 8%
              </span>
              <span className="text-gray-400 text-sm ml-2">from yesterday</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full mt-4">
              <div
                className="h-2 bg-yellow-500 rounded-full"
                style={{ width: '65%' }}
              ></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm">Low Stock Alerts</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">18</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-red-600"></i>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-red-500 flex items-center text-sm font-medium">
                <i className="fas fa-arrow-up mr-1"></i> 5%
              </span>
              <span className="text-gray-400 text-sm ml-2">from last week</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full mt-4">
              <div
                className="h-2 bg-red-500 rounded-full"
                style={{ width: '35%' }}
              ></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm">Today's Deliveries</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">24</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fas fa-truck text-green-600"></i>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 flex items-center text-sm font-medium">
                <i className="fas fa-arrow-up mr-1"></i> 15%
              </span>
              <span className="text-gray-400 text-sm ml-2">from yesterday</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full mt-4">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: '85%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Priority Alerts Banner */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                <i className="fas fa-bell text-orange-500"></i>
              </div>
              <div>
                <h3 className="font-medium text-orange-800">Priority Alerts</h3>
                <p className="text-orange-600 text-sm">
                  3 critical alerts require your immediate attention
                </p>
              </div>
            </div>
            <button className="bg-white text-orange-600 border border-orange-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-100 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
              View All Alerts
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-3 border border-orange-200 flex items-center">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <i className="fas fa-capsules text-red-500 text-sm"></i>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-gray-800">
                    Insulin Stock Critical
                  </p>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Urgent
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Only 2 days of supply remaining
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-orange-200 flex items-center">
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                <i className="fas fa-temperature-high text-yellow-500 text-sm"></i>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-gray-800">
                    Temperature Alert
                  </p>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Warning
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Vaccine storage exceeding 5°C
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-orange-200 flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <i className="fas fa-ambulance text-blue-500 text-sm"></i>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-gray-800">
                    Emergency Request
                  </p>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Priority
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Central Hospital needs antibiotics
                </p>
              </div>
            </div>
          </div>
        </div>

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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hospital
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Drug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <i className="fas fa-hospital text-blue-600 text-sm"></i>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Central Hospital
                          </div>
                          <div className="text-xs text-gray-500">
                            Request #45928
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Amoxicillin</div>
                      <div className="text-xs text-gray-500">Antibiotics</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">500 units</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="bg-green-50 text-green-600 px-2 py-1 rounded text-xs hover:bg-green-100 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                          Approve
                        </button>
                        <button className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs hover:bg-red-100 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <i className="fas fa-hospital text-purple-600 text-sm"></i>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Memorial Clinic
                          </div>
                          <div className="text-xs text-gray-500">
                            Request #45927
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Insulin</div>
                      <div className="text-xs text-gray-500">Diabetes</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">200 units</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Urgent
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="bg-green-50 text-green-600 px-2 py-1 rounded text-xs hover:bg-green-100 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                          Approve
                        </button>
                        <button className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs hover:bg-red-100 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <i className="fas fa-hospital text-green-600 text-sm"></i>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            St. Mary's Hospital
                          </div>
                          <div className="text-xs text-gray-500">
                            Request #45926
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Paracetamol</div>
                      <div className="text-xs text-gray-500">Pain Relief</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">1000 units</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Approved
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs hover:bg-blue-100 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                        Track
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <i className="fas fa-hospital text-red-600 text-sm"></i>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            General Hospital
                          </div>
                          <div className="text-xs text-gray-500">
                            Request #45925
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Morphine</div>
                      <div className="text-xs text-gray-500">
                        Pain Management
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">50 units</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Rejected
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs hover:bg-gray-100 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                        Review
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 flex justify-between items-center border-t border-gray-100">
              <p className="text-sm text-gray-500">Showing 4 of 42 requests</p>
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="px-3 py-1 rounded bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`px-3 py-1 rounded text-sm cursor-pointer !rounded-button whitespace-nowrap ${
                    currentPage === 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  1
                </button>
                <button
                  onClick={() => setCurrentPage(2)}
                  className={`px-3 py-1 rounded text-sm cursor-pointer !rounded-button whitespace-nowrap ${
                    currentPage === 2
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  2
                </button>
                <button
                  onClick={() => setCurrentPage(3)}
                  className={`px-3 py-1 rounded text-sm cursor-pointer !rounded-button whitespace-nowrap ${
                    currentPage === 3
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  3
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                  className="px-3 py-1 rounded bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Supply Chain Tracker */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Supply Chain Tracker
                </h2>
                <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-100 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <i className="fas fa-hospital text-blue-600 text-sm"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Central Hospital
                      </div>
                      <div className="text-xs text-gray-500">
                        Order #45928 - Antibiotics
                      </div>
                    </div>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    In Progress
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                  <div className="relative z-10">
                    <div className="flex mb-6">
                      <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center mr-4">
                        <i className="fas fa-check text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Requested
                        </p>
                        <p className="text-xs text-gray-500">
                          June 21, 2025 - 09:15 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-6">
                      <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center mr-4">
                        <i className="fas fa-check text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Approved
                        </p>
                        <p className="text-xs text-gray-500">
                          June 21, 2025 - 10:30 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-6">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                        <i className="fas fa-sync-alt text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Processing
                        </p>
                        <p className="text-xs text-gray-500">
                          June 21, 2025 - 11:45 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-6">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                        <i className="fas fa-truck text-gray-400 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Dispatched
                        </p>
                        <p className="text-xs text-gray-400">Pending</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                        <i className="fas fa-check-circle text-gray-400 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Delivered
                        </p>
                        <p className="text-xs text-gray-400">Pending</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <i className="fas fa-hospital text-green-600 text-sm"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        St. Mary's Hospital
                      </div>
                      <div className="text-xs text-gray-500">
                        Order #45926 - Paracetamol
                      </div>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Dispatched
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                  <div className="relative z-10">
                    <div className="flex mb-6">
                      <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center mr-4">
                        <i className="fas fa-check text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Requested
                        </p>
                        <p className="text-xs text-gray-500">
                          June 20, 2025 - 02:15 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-6">
                      <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center mr-4">
                        <i className="fas fa-check text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Approved
                        </p>
                        <p className="text-xs text-gray-500">
                          June 20, 2025 - 03:30 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-6">
                      <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center mr-4">
                        <i className="fas fa-check text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Processing
                        </p>
                        <p className="text-xs text-gray-500">
                          June 21, 2025 - 09:15 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-6">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                        <i className="fas fa-truck text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Dispatched
                        </p>
                        <p className="text-xs text-gray-500">
                          June 22, 2025 - 08:30 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                        <i className="fas fa-check-circle text-gray-400 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Delivered
                        </p>
                        <p className="text-xs text-gray-400">
                          Expected: June 22, 2025 - 04:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Vendor Performance Monitor */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Vendor Performance Monitor
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateCharts('weekly')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition duration-200 cursor-pointer !rounded-button whitespace-nowrap ${
                      timeRange === 'weekly'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => updateCharts('monthly')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition duration-200 cursor-pointer !rounded-button whitespace-nowrap ${
                      timeRange === 'monthly'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => updateCharts('yearly')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition duration-200 cursor-pointer !rounded-button whitespace-nowrap ${
                      timeRange === 'yearly'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
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
                <div
                  id="delivery-time-chart"
                  className="h-64 w-full"
                ></div>
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

        {/* Delivery Audit Logs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Delivery Audit Logs
              </h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="pl-8 pr-4 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                </div>
                <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-100 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                  View All
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IPFS Hash
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Temperature
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2025-06-22 08:45:12
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    TXN-458291
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Central Hospital
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a
                      href="#hash"
                      className="text-blue-600 hover:text-blue-800 font-mono text-xs"
                    >
                      Qm8a7d...3f2e
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-green-600">4.2°C</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Verified
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2025-06-21 14:32:05
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    TXN-458290
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Memorial Clinic
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a
                      href="#hash"
                      className="text-blue-600 hover:text-blue-800 font-mono text-xs"
                    >
                      Qm9c4e...7a1d
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-yellow-600">5.8°C</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Warning
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2025-06-21 10:15:33
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    TXN-458289
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    St. Mary's Hospital
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a
                      href="#hash"
                      className="text-blue-600 hover:text-blue-800 font-mono text-xs"
                    >
                      Qm7b2f...9e4c
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-green-600">3.5°C</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Verified
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2025-06-20 16:48:27
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    TXN-458288
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    General Hospital
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a
                      href="#hash"
                      className="text-blue-600 hover:text-blue-800 font-mono text-xs"
                    >
                      Qm5e3a...2c8b
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-red-600">8.7°C</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Failed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 flex justify-between items-center border-t border-gray-100">
            <p className="text-sm text-gray-500">Showing 4 of 128 transactions</p>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="px-3 py-1 rounded bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                onClick={() => setCurrentPage(1)}
                className={`px-3 py-1 rounded text-sm cursor-pointer !rounded-button whitespace-nowrap ${
                  currentPage === 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`px-3 py-1 rounded text-sm cursor-pointer !rounded-button whitespace-nowrap ${
                  currentPage === 2
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`px-3 py-1 rounded text-sm cursor-pointer !rounded-button whitespace-nowrap ${
                  currentPage === 3
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                3
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                className="px-3 py-1 rounded bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Quick Actions Floating Button */}
      <div className="fixed bottom-8 right-8">
        <div className="relative group">
          <button className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
            <i className="fas fa-plus text-xl"></i>
          </button>
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
            <a
              href="#new-drug"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg"
            >
              <i className="fas fa-pills text-blue-600 mr-3"></i>
              Add New Drug
            </a>
            <a
              href="#new-request"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg"
            >
              <i className="fas fa-clipboard-list text-blue-600 mr-3"></i>
              Create Request
            </a>
            <a
              href="#generate-report"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg"
            >
              <i className="fas fa-file-alt text-blue-600 mr-3"></i>
              Generate Report
            </a>
            <a
              href="#emergency"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg"
            >
              <i className="fas fa-exclamation-circle text-red-600 mr-3"></i>
              Emergency Protocol
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;