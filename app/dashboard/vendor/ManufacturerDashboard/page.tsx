
'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { signOut } from 'next-auth/react';

const ManufacturerDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDispatchForm, setShowDispatchForm] = useState(false);
  const fileInputInvoiceRef = useRef<HTMLInputElement>(null);
  const fileInputProofRef = useRef<HTMLInputElement>(null);

  // Mock data for metrics
  const metrics = {
    pendingOrders: 42,
    shipmentsInTransit: 18,
    deliveriesConfirmed: 126,
    slaBreaches: 3
  };

  // Mock data for orders
  const orders = [
    { id: 'ORD-2025-0642', status: 'pending', customer: 'Central Medical Supplies', date: '2025-06-20', dispatchDate: '2025-06-25' },
    { id: 'ORD-2025-0641', status: 'in-progress', customer: 'Northern District Hospital', date: '2025-06-19', dispatchDate: '2025-06-24' },
    { id: 'ORD-2025-0640', status: 'completed', customer: 'Southern Healthcare Center', date: '2025-06-18', dispatchDate: '2025-06-23' },
    { id: 'ORD-2025-0639', status: 'delayed', customer: 'Eastern Medical Institute', date: '2025-06-17', dispatchDate: '2025-06-22' },
    { id: 'ORD-2025-0638', status: 'pending', customer: 'Western Regional Hospital', date: '2025-06-16', dispatchDate: '2025-06-21' }
  ];

  // Initialize charts
  useEffect(() => {
    if (activeTab === 'dashboard') {
      // Delivery Times Chart
      const deliveryTimesChart = echarts.init(document.getElementById('delivery-times-chart'));
      const deliveryTimesOption = {
        animation: false,
        title: {
          text: 'Average Delivery Times',
          left: 'center',
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        yAxis: {
          type: 'value',
          name: 'Days'
        },
        series: [{
          data: [3.2, 2.8, 3.5, 2.9, 2.6, 2.4],
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#2196f3'
          },
          itemStyle: {
            color: '#2196f3'
          }
        }]
      };
      deliveryTimesChart.setOption(deliveryTimesOption);

      // SLA Compliance Chart
      const slaComplianceChart = echarts.init(document.getElementById('sla-compliance-chart'));
      const slaComplianceOption = {
        animation: false,
        title: {
          text: 'SLA Compliance Rate',
          left: 'center',
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        yAxis: {
          type: 'value',
          name: 'Percentage',
          max: 100
        },
        series: [{
          data: [98, 97, 95, 98, 99, 97],
          type: 'bar',
          itemStyle: {
            color: '#4caf50'
          }
        }]
      };
      slaComplianceChart.setOption(slaComplianceOption);

      // Order Status Distribution Chart
      const orderStatusChart = echarts.init(document.getElementById('order-status-chart'));
      const orderStatusOption = {
        animation: false,
        title: {
          text: 'Order Status Distribution',
          left: 'center',
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'middle'
        },
        series: [{
          type: 'pie',
          radius: '70%',
          data: [
            { value: 42, name: 'Pending', itemStyle: { color: '#ff9800' } },
            { value: 18, name: 'In Transit', itemStyle: { color: '#2196f3' } },
            { value: 126, name: 'Delivered', itemStyle: { color: '#4caf50' } },
            { value: 3, name: 'Delayed', itemStyle: { color: '#f44336' } }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
      orderStatusChart.setOption(orderStatusOption);

      // Handle resize
      const handleResize = () => {
        deliveryTimesChart.resize();
        slaComplianceChart.resize();
        orderStatusChart.resize();
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        deliveryTimesChart.dispose();
        slaComplianceChart.dispose();
        orderStatusChart.dispose();
      };
    }
  }, [activeTab]);

  // Calculate time remaining for next dispatch
  const calculateTimeRemaining = () => {
    const now = new Date();
    const dispatchTime = new Date();
    dispatchTime.setHours(17, 0, 0); // 5:00 PM

    if (now > dispatchTime) {
      dispatchTime.setDate(dispatchTime.getDate() + 1);
    }

    const diffMs = dispatchTime.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHrs}h ${diffMins}m`;
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleInvoiceFileClick = () => {
    if (fileInputInvoiceRef.current) {
      fileInputInvoiceRef.current.click();
    }
  };

  const handleProofFileClick = () => {
    if (fileInputProofRef.current) {
      fileInputProofRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log(`${type} file selected:`, files[0].name);
      event.target.value = '';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 z-10">
        <div className="flex items-center">
          <div className="text-xl font-bold text-blue-900 mr-8">
            <i className="fas fa-pills mr-2"></i>
            MedSupply
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders, batches, invoices..."
              className="w-96 h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <i className="fas fa-bell text-gray-600"></i>
              <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="p-3 border-b border-gray-200 font-medium">Notifications</div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="text-sm font-medium">New order received</div>
                    <div className="text-xs text-gray-500">10 minutes ago</div>
                  </div>
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="text-sm font-medium">Delivery confirmation pending</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                  <div className="p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="text-sm font-medium">SLA breach warning</div>
                    <div className="text-xs text-gray-500">Yesterday</div>
                  </div>
                </div>
                <div className="p-2 text-center text-sm text-blue-600 border-t border-gray-200 cursor-pointer hover:bg-gray-50">
                  View all notifications
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <div className="text-sm font-medium">John Smith</div>
                <div className="text-xs text-gray-500">Vendor Admin</div>
              </div>
              <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
            </div>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="p-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2">
                  <i className="fas fa-user-circle text-gray-500"></i>
                  <span className="text-sm">Profile</span>
                </div>
                <div className="p-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2">
                  <i className="fas fa-cog text-gray-500"></i>
                  <span className="text-sm">Settings</span>
                </div>
                <div className="border-t border-gray-200"></div>
                <div className="p-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2 text-red-600">
                  <i className="fas fa-sign-out-alt"></i>
                  <button className="text-sm" onClick={() => signOut({ callbackUrl: '/sign-in' })}>Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Manufacturer Dashboard</h1>
              <div className="text-sm text-gray-500">
                <i className="far fa-calendar-alt mr-2"></i>
                Sunday, June 22, 2025
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-5 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gray-800">{metrics.pendingOrders}</div>
                    <div className="text-sm text-gray-500 mt-1">Pending Orders</div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                    <i className="fas fa-clock text-xl"></i>
                  </div>
                </div>
                <div className="text-xs text-green-600 mt-2 flex items-center">
                  <i className="fas fa-arrow-up mr-1"></i>
                  <span>12% from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gray-800">{metrics.shipmentsInTransit}</div>
                    <div className="text-sm text-gray-500 mt-1">Shipments in Transit</div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <i className="fas fa-truck text-xl"></i>
                  </div>
                </div>
                <div className="text-xs text-blue-600 mt-2 flex items-center">
                  <i className="fas fa-equals mr-1"></i>
                  <span>Same as last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gray-800">{metrics.deliveriesConfirmed}</div>
                    <div className="text-sm text-gray-500 mt-1">Deliveries Confirmed</div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <i className="fas fa-check-circle text-xl"></i>
                  </div>
                </div>
                <div className="text-xs text-green-600 mt-2 flex items-center">
                  <i className="fas fa-arrow-up mr-1"></i>
                  <span>8% from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-5 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gray-800">{metrics.slaBreaches}</div>
                    <div className="text-sm text-gray-500 mt-1">SLA Breaches</div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                    <i className="fas fa-exclamation-triangle text-xl"></i>
                  </div>
                </div>
                <div className="text-xs text-green-600 mt-2 flex items-center">
                  <i className="fas fa-arrow-down mr-1"></i>
                  <span>2 fewer than last month</span>
                </div>
              </div>
            </div>

            {/* Live Dispatch Timer */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-hourglass-half text-blue-600 mr-3 text-xl"></i>
                  <h2 className="text-lg font-semibold text-gray-800">Next Dispatch Deadline</h2>
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                  Today
                </div>
              </div>
              <div className="p-5 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Order #ORD-2025-0642</div>
                  <div className="text-base font-medium">Central Medical Supplies - 500 units of Paracetamol</div>
                  <div className="text-sm text-gray-500 mt-1">Priority: High</div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-center">
                  <div className="text-sm text-gray-500 mb-1">Time Remaining</div>
                  <div className="text-3xl font-bold text-red-600">{timeRemaining}</div>
                  <div className="text-sm text-gray-500 mt-1">Until 5:00 PM</div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer whitespace-nowrap">
                    <i className="fas fa-box-open mr-2"></i>
                    Prepare Shipment
                  </button>
                </div>
              </div>
            </div>

            {/* Order Management */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-clipboard-list text-blue-600 mr-3 text-xl"></i>
                  <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer whitespace-nowrap">
                  View All Orders
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Dispatch</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                            order.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                              order.status === 'pending' ? 'bg-orange-500' :
                              order.status === 'in-progress' ? 'bg-blue-500' :
                              order.status === 'completed' ? 'bg-green-500' :
                              'bg-red-500'
                            }`}></span>
                            {order.status === 'pending' ? 'Pending' :
                             order.status === 'in-progress' ? 'In Progress' :
                             order.status === 'completed' ? 'Completed' :
                             'Delayed'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.dispatchDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {order.status === 'pending' ? (
                            <div className="flex justify-end space-x-2">
                              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded cursor-pointer whitespace-nowrap">
                                Accept
                              </button>
                              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer whitespace-nowrap">
                                Reject
                              </button>
                            </div>
                          ) : (
                            <button className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap">
                              View Details
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing 5 of 42 orders
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="px-3 py-1 rounded border border-gray-300 bg-blue-600 text-white cursor-pointer whitespace-nowrap">
                    1
                  </button>
                  <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    2
                  </button>
                  <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    3
                  </button>
                  <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Performance Monitoring */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-800">Delivery Performance</h3>
                </div>
                <div className="p-4">
                  <div id="delivery-times-chart" className="h-64"></div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-800">SLA Compliance</h3>
                </div>
                <div className="p-4">
                  <div id="sla-compliance-chart" className="h-64"></div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-800">Order Status</h3>
                </div>
                <div className="p-4">
                  <div id="order-status-chart" className="h-64"></div>
                </div>
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Document Management</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5">
                <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3">
                    <i className="fas fa-file-invoice text-xl"></i>
                  </div>
                  <h3 className="text-base font-medium text-gray-800 mb-1">Upload Invoice</h3>
                  <p className="text-sm text-gray-500 text-center mb-3">Drag and drop your invoice PDF or image here</p>
                  <input
                    type="file"
                    ref={fileInputInvoiceRef}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'invoice')}
                  />
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer whitespace-nowrap"
                    onClick={handleInvoiceFileClick}
                  >
                    <i className="fas fa-upload mr-2"></i>
                    Select File
                  </button>
                  <div className="text-xs text-gray-500 mt-2">Supported: PDF, JPG, PNG</div>
                </div>

                <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-3">
                    <i className="fas fa-truck-loading text-xl"></i>
                  </div>
                  <h3 className="text-base font-medium text-gray-800 mb-1">Dispatch Form</h3>
                  <p className="text-sm text-gray-500 text-center mb-3">Enter shipping details and tracking information</p>
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer whitespace-nowrap"
                    onClick={() => setShowDispatchForm(true)}
                  >
                    <i className="fas fa-pen-alt mr-2"></i>
                    Fill Form
                  </button>
                  <div className="text-xs text-gray-500 mt-2">For orders ready to ship</div>
                </div>

                <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 mb-3">
                    <i className="fas fa-clipboard-check text-xl"></i>
                  </div>
                  <h3 className="text-base font-medium text-gray-800 mb-1">Delivery Proof</h3>
                  <p className="text-sm text-gray-500 text-center mb-3">Upload signed delivery confirmation documents</p>
                  <input
                    type="file"
                    ref={fileInputProofRef}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'proof')}
                  />
                  <button 
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer whitespace-nowrap"
                    onClick={handleProofFileClick}
                  >
                    <i className="fas fa-upload mr-2"></i>
                    Upload Proof
                  </button>
                  <div className="text-xs text-gray-500 mt-2">Required for completed deliveries</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Dispatch Form Modal */}
      {showDispatchForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Dispatch Form</h2>
              <button 
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowDispatchForm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    defaultValue="ORD-2025-0642"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    defaultValue="Central Medical Supplies"
                    readOnly
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Carrier</label>
                  <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option value="">Select a carrier</option>
                    <option value="fedex">FedEx</option>
                    <option value="ups">UPS</option>
                    <option value="dhl">DHL</option>
                    <option value="usps">USPS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter tracking number"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows={3}
                  defaultValue="123 Medical Center Drive, Suite 400, Central City, CA 90210"
                  readOnly
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Package Weight (kg)</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter weight"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Packages</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter quantity"
                    defaultValue="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Method</label>
                  <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option value="">Select a method</option>
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                    <option value="overnight">Overnight</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows={3}
                  placeholder="Enter any special handling instructions"
                ></textarea>
              </div>
              
              <div className="flex items-center mb-4">
                <input 
                  type="checkbox" 
                  id="temperature-controlled" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="temperature-controlled" className="ml-2 block text-sm text-gray-700">
                  Temperature-controlled shipping required
                </label>
              </div>
              
              <div className="flex items-center mb-4">
                <input 
                  type="checkbox" 
                  id="fragile" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="fragile" className="ml-2 block text-sm text-gray-700">
                  Fragile items included
                </label>
              </div>
            </div>
            <div className="p-5 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                onClick={() => setShowDispatchForm(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer whitespace-nowrap"
                onClick={() => {
                  console.log('Dispatch form submitted');
                  setShowDispatchForm(false);
                }}
              >
                Submit Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerDashboardPage;