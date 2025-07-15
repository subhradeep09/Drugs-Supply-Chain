import React, { useState } from 'react';
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPills, faBell, faUser, faChevronDown, faUserCircle, faCog, faSignOutAlt, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

const DashboardNavbar: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
    useEffect(() => {
      fetch('/api/profile')
        .then(res => res.json())
        .then(json => {
          setData(json)
          setLoading(false)
        })
        .catch(err => {
          console.error(err)
          setLoading(false)
        })
    }, [])
  
    if (loading) return (
      <div className="p-6 flex items-center justify-center h-64">
        
      </div>
    )

  
    const { user} = data
 
  // TODO: Replace with real user data from session


  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 z-50">
      <div className="flex items-center">
        <div className="text-xl font-bold text-blue-900 mr-8">
          <img src="/logo.png" alt="Logo" className="h-21 w-21 object-contain" />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders, batches, invoices..."
            className="w-96 h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FontAwesomeIcon icon={faBell} className="text-gray-600" />
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
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div>
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-gray-500">{user.role}</div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
          </div>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <Link href='/profile' className="p-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2">
                <FontAwesomeIcon icon={faUserCircle} className="text-gray-500" />
                <div    className="text-sm">Profile</div>
              </Link>
              <div className="p-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2">
                <FontAwesomeIcon icon={faCog} className="text-gray-500" />
                <span className="text-sm">Settings</span>
              </div>
              <div className="border-t border-gray-200"></div>
              <div className="p-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2 text-red-600">
                <FontAwesomeIcon icon={faSignOutAlt} />
                <button className="text-sm" onClick={() => signOut({ callbackUrl: '/sign-in' })}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar; 