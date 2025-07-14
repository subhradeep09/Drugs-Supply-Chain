"use client";

import React, { useEffect, useState } from 'react';

export const WelcomeBanner: React.FC = () => {
  const [alertCount, setAlertCount] = useState(0);

  // Get formatted date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Fetch priority alerts on mount
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch('/api/admin-priority-alerts');
        const data = await res.json();

        if (data.success) {
          setAlertCount(data.alerts?.length || 0); // or filter by level if needed
        }
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="mb-8 bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl overflow-hidden shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="p-8 md:w-1/2">
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome back, Admin!
          </h2>
          <p className="text-blue-100 mb-6">
            Today is {formattedDate}. You have {alertCount} critical alert{alertCount !== 1 ? 's' : ''}.
          </p>
          <button className="bg-white text-blue-800 px-6 py-2 rounded-lg font-medium shadow-md hover:bg-blue-50 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
            View Alerts
          </button>
        </div>
        <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-blue-700"></div>
      </div>
    </div>
  );
};
