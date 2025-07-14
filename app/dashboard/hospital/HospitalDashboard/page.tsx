

'use client';

import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { signOut } from 'next-auth/react';

const HospitalDashboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium');
  const [showUrgencyDropdown, setShowUrgencyDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Drug options for auto-suggest
  const drugOptions = [
    'Amoxicillin 500mg',
    'Paracetamol 500mg',
    'Ibuprofen 400mg',
    'Metformin 850mg',
    'Atorvastatin 20mg',
    'Omeprazole 20mg',
    'Lisinopril 10mg',
    'Azithromycin 250mg'
  ];

  // Filtered drug options based on search
  const filteredDrugs = drugOptions.filter(drug =>
    drug.toLowerCase().includes(selectedDrug.toLowerCase())
  );

  // Sample notification data
  const notifications = [
    { id: 1, message: 'New drug request approved', time: '10 minutes ago', isRead: false },
    { id: 2, message: 'Delivery #12345 confirmed', time: '1 hour ago', isRead: false },
    { id: 3, message: 'Low stock alert: Amoxicillin', time: '3 hours ago', isRead: true },
    { id: 4, message: 'System maintenance scheduled', time: 'Yesterday', isRead: true }
  ];

  // Initialize charts after component mounts
  useEffect(() => {
    // Drug Usage Chart
    const usageChartDom = document.getElementById('drug-usage-chart');
    if (usageChartDom) {
      const usageChart = echarts.init(usageChartDom);
      const usageOption = {
        animation: false,
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Antibiotics', 'Painkillers', 'Cardiovascular']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Antibiotics',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230],
            color: '#1976D2'
          },
          {
            name: 'Painkillers',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330],
            color: '#4CAF50'
          },
          {
            name: 'Cardiovascular',
            type: 'line',
            data: [150, 232, 201, 154, 190, 330],
            color: '#F44336'
          }
        ]
      };
      usageChart.setOption(usageOption);

      // Responsive chart
      const handleResize = () => {
        usageChart.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        usageChart.dispose();
      };
    }

    // Stock Levels Chart
    const stockChartDom = document.getElementById('stock-levels-chart');
    if (stockChartDom) {
      const stockChart = echarts.init(stockChartDom);
      const stockOption = {
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Current Stock', 'Minimum Required']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['Amoxicillin', 'Paracetamol', 'Ibuprofen', 'Metformin', 'Atorvastatin']
        },
        series: [
          {
            name: 'Current Stock',
            type: 'bar',
            data: [320, 302, 301, 334, 390],
            color: '#2196F3'
          },
          {
            name: 'Minimum Required',
            type: 'bar',
            data: [120, 132, 101, 134, 90],
            color: '#FFC107'
          }
        ]
      };
      stockChart.setOption(stockOption);

      // Responsive chart
      const handleResize = () => {
        stockChart.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        stockChart.dispose();
      };
    }
  }, []);

  // Handle drug request submission
  const handleDrugRequest = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Request submitted for ${selectedDrug}, Quantity: ${quantity}, Urgency: ${urgency}`);
    setSelectedDrug('');
    setQuantity(1);
    setUrgency('medium');
  };

  return (
    <div className="overflow-y-auto p-6 bg-gray-100" style={{ minHeight: '100vh' }}>
      <main>
        <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back, Dr. Johnson. Here's what's happening today.</p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Requests */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Drug Requests</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">1,284</h3>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <i className="fas fa-clipboard-list text-blue-500 text-xl"></i>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-green-500 flex items-center text-sm">
                  <i className="fas fa-arrow-up mr-1"></i> 12.5%
                </span>
                <span className="text-xs text-gray-500 ml-2">from last month</span>
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">42</h3>
                </div>
                <div className="p-2 bg-yellow-50 rounded-full">
                  <i className="fas fa-clock text-yellow-500 text-xl"></i>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-red-500 flex items-center text-sm">
                  <i className="fas fa-arrow-up mr-1"></i> 8.3%
                </span>
                <span className="text-xs text-gray-500 ml-2">from yesterday</span>
              </div>
            </div>

            {/* Delivered Shipments */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Delivered Shipments</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">856</h3>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <i className="fas fa-truck-loading text-green-500 text-xl"></i>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-green-500 flex items-center text-sm">
                  <i className="fas fa-check-circle mr-1"></i> 98.7%
                </span>
                <span className="text-xs text-gray-500 ml-2">success rate</span>
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Low Stock Alerts</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">8</h3>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <i className="fas fa-exclamation-triangle text-red-500 text-xl"></i>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-red-500 flex items-center text-sm">
                  <i className="fas fa-arrow-down mr-1"></i> 3
                </span>
                <span className="text-xs text-gray-500 ml-2">critical items</span>
              </div>
            </div>
          </div>

          {/* Drug Request Form and History */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Drug Request Form */}
            <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-1">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">New Drug Request</h2>
              <form onSubmit={handleDrugRequest}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Drug
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Search for drugs..."
                      value={selectedDrug}
                      onChange={(e) => setSelectedDrug(e.target.value)}
                      onClick={() => setSelectedDrug('')}
                    />
                    <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    {selectedDrug && filteredDrugs.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                        {filteredDrugs.map((drug, index) => (
                          <div
                            key={index}
                            className="p-2 hover:bg-blue-50 cursor-pointer"
                            onClick={() => {
                              setSelectedDrug(drug);
                            }}
                          >
                            {drug}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="p-2 bg-gray-100 rounded-l-lg border border-gray-300 cursor-pointer !rounded-button whitespace-nowrap"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <i className="fas fa-minus text-gray-600"></i>
                    </button>
                    <input
                      type="number"
                      className="w-20 p-2 border-t border-b border-gray-300 text-center focus:outline-none text-sm"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                    />
                    <button
                      type="button"
                      className="p-2 bg-gray-100 rounded-r-lg border border-gray-300 cursor-pointer !rounded-button whitespace-nowrap"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <i className="fas fa-plus text-gray-600"></i>
                    </button>
                    <span className="ml-2 text-sm text-gray-600">Units</span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urgency Level
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg flex items-center justify-between cursor-pointer !rounded-button whitespace-nowrap"
                      onClick={() => setShowUrgencyDropdown(!showUrgencyDropdown)}
                    >
                      <div className="flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-2 ${urgency === 'low' ? 'bg-green-500' :
                            urgency === 'medium' ? 'bg-yellow-500' :
                              'bg-red-500'
                          }`}></span>
                        <span className="text-sm capitalize">{urgency}</span>
                      </div>
                      <i className="fas fa-chevron-down text-gray-400"></i>
                    </button>
                    {showUrgencyDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <div
                          className="p-2 hover:bg-blue-50 cursor-pointer flex items-center"
                          onClick={() => {
                            setUrgency('low');
                            setShowUrgencyDropdown(false);
                          }}
                        >
                          <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                          <span className="text-sm">Low</span>
                        </div>
                        <div
                          className="p-2 hover:bg-blue-50 cursor-pointer flex items-center"
                          onClick={() => {
                            setUrgency('medium');
                            setShowUrgencyDropdown(false);
                          }}
                        >
                          <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                          <span className="text-sm">Medium</span>
                        </div>
                        <div
                          className="p-2 hover:bg-blue-50 cursor-pointer flex items-center"
                          onClick={() => {
                            setUrgency('high');
                            setShowUrgencyDropdown(false);
                          }}
                        >
                          <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                          <span className="text-sm">High</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Submit Request
                </button>
              </form>
            </div>

            {/* Request History */}
            <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Recent Requests</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                  View All <i className="fas fa-chevron-right ml-1 text-xs"></i>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Drug Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Amoxicillin 500mg</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">200 units</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">June 21, 2025</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Approved
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-800 mr-3 cursor-pointer !rounded-button whitespace-nowrap">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 cursor-pointer !rounded-button whitespace-nowrap">
                          <i className="fas fa-download"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Ibuprofen 400mg</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">100 units</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">June 20, 2025</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-800 mr-3 cursor-pointer !rounded-button whitespace-nowrap">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-800 cursor-pointer !rounded-button whitespace-nowrap">
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Metformin 850mg</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">150 units</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">June 19, 2025</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Rejected
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-800 mr-3 cursor-pointer !rounded-button whitespace-nowrap">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="text-green-600 hover:text-green-800 cursor-pointer !rounded-button whitespace-nowrap">
                          <i className="fas fa-redo"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Atorvastatin 20mg</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">80 units</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">June 18, 2025</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Delivered
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-800 mr-3 cursor-pointer !rounded-button whitespace-nowrap">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 cursor-pointer !rounded-button whitespace-nowrap">
                          <i className="fas fa-download"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  Showing 4 of 120 results
                </div>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-chevron-left text-xs"></i>
                  </button>
                  <button className="px-3 py-1 bg-blue-600 rounded-md text-white cursor-pointer !rounded-button whitespace-nowrap">
                    1
                  </button>
                  <button className="px-3 py-1 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap">
                    2
                  </button>
                  <button className="px-3 py-1 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap">
                    3
                  </button>
                  <button className="px-3 py-1 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-chevron-right text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Tracking and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Order Tracking */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Live Order Tracker</h2>
              <div className="relative">
                <div className="absolute left-8 top-0 h-full w-1 bg-gray-200"></div>
                {/* Step 1 */}
                <div className="relative flex items-start mb-6">
                  <div className="absolute left-8 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center -ml-4 z-10">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div className="ml-12">
                    <h3 className="text-md font-medium text-gray-800">Request Submitted</h3>
                    <p className="text-sm text-gray-500 mt-1">Amoxicillin 500mg (200 units)</p>
                    <p className="text-xs text-gray-400 mt-1">June 21, 2025 - 08:30 AM</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="relative flex items-start mb-6">
                  <div className="absolute left-8 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center -ml-4 z-10">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div className="ml-12">
                    <h3 className="text-md font-medium text-gray-800">Request Approved</h3>
                    <p className="text-sm text-gray-500 mt-1">Approved by Dr. Michael Chen</p>
                    <p className="text-xs text-gray-400 mt-1">June 21, 2025 - 09:45 AM</p>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="relative flex items-start mb-6">
                  <div className="absolute left-8 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center -ml-4 z-10">
                    <i className="fas fa-truck text-white text-sm"></i>
                  </div>
                  <div className="ml-12">
                    <h3 className="text-md font-medium text-gray-800">Shipment in Transit</h3>
                    <p className="text-sm text-gray-500 mt-1">Estimated arrival in 2 hours</p>
                    <p className="text-xs text-gray-400 mt-1">June 22, 2025 - 10:15 AM</p>
                  </div>
                </div>
                {/* Step 4 */}
                <div className="relative flex items-start">
                  <div className="absolute left-8 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center -ml-4 z-10">
                    <i className="fas fa-box text-white text-sm"></i>
                  </div>
                  <div className="ml-12">
                    <h3 className="text-md font-medium text-gray-400">Delivery Confirmation</h3>
                    <p className="text-sm text-gray-400 mt-1">Pending delivery confirmation</p>
                    <p className="text-xs text-gray-400 mt-1">Estimated: June 22, 2025</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-md font-medium text-gray-800 mb-3">Delivery Confirmation</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center">
                  <div className="w-full max-w-xs h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <i className="fas fa-qrcode text-gray-400 text-5xl"></i>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 text-center">
                    Scan the QR code on the package to confirm delivery
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-camera mr-2"></i>
                    Scan QR Code
                  </button>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Drug Usage Analytics</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 text-sm cursor-pointer !rounded-button whitespace-nowrap">
                    Weekly
                  </button>
                  <button className="px-3 py-1 bg-blue-600 rounded-md text-white text-sm cursor-pointer !rounded-button whitespace-nowrap">
                    Monthly
                  </button>
                  <button className="px-3 py-1 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 text-sm cursor-pointer !rounded-button whitespace-nowrap">
                    Yearly
                  </button>
                </div>
              </div>
              <div className="h-64 mb-6" id="drug-usage-chart"></div>
              <h3 className="text-md font-medium text-gray-800 mb-3">Current Stock Levels</h3>
              <div className="h-64" id="stock-levels-chart"></div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-medium text-gray-800">Top Requested Drugs</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                    Export <i className="fas fa-download ml-1"></i>
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-32 text-sm text-gray-600">Amoxicillin</div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm text-gray-600">75%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 text-sm text-gray-600">Paracetamol</div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm text-gray-600">68%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 text-sm text-gray-600">Metformin</div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full" style={{ width: '52%' }}></div>
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm text-gray-600">52%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 text-sm text-gray-600">Atorvastatin</div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm text-gray-600">45%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 text-sm text-gray-600">Omeprazole</div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full" style={{ width: '38%' }}></div>
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm text-gray-600">38%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Feedback to Admin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Feedback Category
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                      <option value="">Select a category</option>
                      <option value="quality">Drug Quality Issue</option>
                      <option value="delivery">Delivery Problem</option>
                      <option value="inventory">Inventory Discrepancy</option>
                      <option value="system">System Suggestion</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority Level
                    </label>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className="flex-1 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        Low
                      </button>
                      <button
                        type="button"
                        className="flex-1 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        Medium
                      </button>
                      <button
                        type="button"
                        className="flex-1 py-2 bg-red-100 text-red-800 rounded-lg text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        High
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      rows={4}
                      placeholder="Describe your feedback or issue in detail..."
                    ></textarea>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Attachments
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <i className="fas fa-cloud-upload-alt text-gray-400 text-2xl mb-2"></i>
                      <p className="text-sm text-gray-500">
                        Drag and drop files here, or click to browse
                      </p>
                      <input type="file" className="hidden" />
                      <button
                        type="button"
                        className="mt-2 px-4 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        Browse Files
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    Submit Feedback
                  </button>
                </form>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-md font-medium text-gray-800 mb-3">Recent Feedback Status</h3>
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          Delivery Problem
                        </span>
                        <h4 className="text-sm font-medium text-gray-800 mt-1">
                          Late delivery of critical medications
                        </h4>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Resolved
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Submitted on June 15, 2025 • Resolved in 2 days
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          Drug Quality Issue
                        </span>
                        <h4 className="text-sm font-medium text-gray-800 mt-1">
                          Packaging damage on antibiotics shipment
                        </h4>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        In Progress
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Submitted on June 18, 2025 • Under investigation
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                          System Suggestion
                        </span>
                        <h4 className="text-sm font-medium text-gray-800 mt-1">
                          Add batch tracking feature to inventory system
                        </h4>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Pending
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Submitted on June 20, 2025 • Awaiting review
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-md font-medium text-gray-800 mb-3">Response Time</h3>
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div className="ml-4 text-sm font-medium text-green-600">
                      85% <span className="text-gray-500 font-normal">within 24hrs</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Our admin team aims to respond to all feedback within 24 hours. Current average response time: 18 hours.
                  </p>
                  <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-history mr-2"></i>
                    View Feedback History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
};

export default HospitalDashboardPage;


