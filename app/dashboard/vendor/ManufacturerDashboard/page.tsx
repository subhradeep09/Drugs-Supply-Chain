'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/ui/table'
import { Badge } from '@/app/ui/badge'
import { Button } from '@/app/ui/button'
import { Input } from '@/app/ui/input'
import { Bell, Settings, LogOut, TrendingUp, Package, CalendarCheck, ThumbsUp } from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const mockOrders = [
  {
    id: 'ORD001',
    hospital: 'City General Hospital',
    drugs: [
      { name: 'Paracetamol 500mg', quantity: 1000 },
      { name: 'Amoxicillin 250mg', quantity: 500 },
    ],
    status: 'pending',
    orderDate: '2024-03-15',
    deliveryDate: '2024-03-20',
    totalValue: 2500,
  },
  {
    id: 'ORD002',
    hospital: 'St. Mary Medical Center',
    drugs: [
      { name: 'Ibuprofen 400mg', quantity: 800 },
      { name: 'Omeprazole 20mg', quantity: 300 },
    ],
    status: 'processing',
    orderDate: '2024-03-14',
    deliveryDate: '2024-03-19',
    totalValue: 1800,
  },
  {
    id: 'ORD003',
    hospital: 'Regional Health Center',
    drugs: [
      { name: 'Metformin 500mg', quantity: 600 },
      { name: 'Aspirin 75mg', quantity: 400 },
    ],
    status: 'shipped',
    orderDate: '2024-03-13',
    deliveryDate: '2024-03-18',
    totalValue: 1200,
  },
]

const userName = "Abir Paul";
const userInitial = userName.charAt(0);

export default function ManufacturerDashboardPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [timeframe, setTimeframe] = useState('Monthly')
  const dropdownRef = useRef()

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const revenueData = {
    Monthly: { value: '$45,678', change: 12.5 },
    Yearly: { value: '$512,000', change: 5.3 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 p-6 space-y-8">

      {/* Top Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">Manufacturer Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your pharmaceutical manufacturing operations</p>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)} 
            className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold shadow hover:shadow-lg transition"
          >
            {userInitial}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white border rounded-xl shadow-xl z-50">
              <button className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 w-full text-left">
                <Bell size={18} /> Notifications
              </button>
              <button className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 w-full text-left">
                <Settings size={18} /> Settings
              </button>
              <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
  { title: 'Active Orders', value: '12', subtitle: 'Pending fulfillment', icon: Package, bgColor: 'bg-blue-100' },
  {
    title: `${timeframe} Revenue`, // <-- This is now dynamic title
    isRevenue: true,
    icon: TrendingUp,
    bgColor: revenueData[timeframe].change >= 0 ? 'bg-green-100' : 'bg-red-100',
    value: revenueData[timeframe].value,
    subtitle: `${revenueData[timeframe].change >= 0 ? '+' : ''}${revenueData[timeframe].change}% from last ${timeframe.toLowerCase()}`
  },
  { title: 'Production Rate', value: '95%', subtitle: 'On-time delivery', icon: CalendarCheck, bgColor: 'bg-yellow-100' },
  { title: 'Quality Score', value: '4.8/5', subtitle: 'Customer satisfaction', icon: ThumbsUp, bgColor: 'bg-pink-100' },
].map((stat, index) => {
  const cardContent = (
    <Card key={index} className={`${stat.bgColor} shadow-lg rounded-2xl hover:shadow-xl transition`}>
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-sm text-gray-600 flex items-center">
          {stat.title}
        </CardTitle>
        <stat.icon className="text-blue-500" size={22} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
        <p className="text-sm text-gray-400">{stat.subtitle}</p>
      </CardContent>
    </Card>
  );

  return stat.isRevenue ? (
    <div key={index} onClick={() => setTimeframe(timeframe === 'Monthly' ? 'Yearly' : 'Monthly')} className="cursor-pointer">
      {cardContent}
    </div>
  ) : cardContent;
})}

      </div>

      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg rounded-2xl"style={{ backgroundColor: '#EFE5E3', color: '#11111' }}>
          <CardHeader>
            <CardTitle>Production Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { drug: 'Paracetamol 500mg', batch: 'BATCH123', status: 'In Production', badge: 'secondary' },
              { drug: 'Amoxicillin 250mg', batch: 'BATCH124', status: 'Completed', badge: 'success' },
              { drug: 'Ibuprofen 400mg', batch: 'BATCH125', status: 'Quality Check', badge: 'secondary' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.drug}</p>
                  <p className="text-sm text-gray-400">Batch #{item.batch}</p>
                </div>
                <Badge variant={item.badge}>{item.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

       <Card className="shadow-lg rounded-2xl">
         <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="flex justify-around flex-wrap gap-4">
            {[
              { label: 'Raw Materials', value: 25, subtitle: 'Available stock', color: '#3B82F6' },
              { label: 'Finished Products', value: 1200, subtitle: 'Ready for shipping', color: '#22C55E' },
              { label: 'Storage Capacity', value: 65, subtitle: 'Utilization', color: '#F59E0B' },
             ].map((item, index) => (
                 <div key={index} className="flex flex-col items-center justify-center space-y-2">
                 <div className="w-24 h-24 flex items-center justify-center">
                      {item.label === 'Finished Products' ? (
                      <span className="text-2xl font-bold text-gray-700">{item.value}</span>
                  ) : (       
                   <CircularProgressbar
                        value={item.value}
                        text={`${item.value}%`}
                        styles={buildStyles({
                            textSize: '18px',
                            pathColor: item.color,
                            textColor: '#1F2937',
                            trailColor: '#E5E7EB',
                      })}
                     />
                  )}
                </div>
                <div className="text-center">
                   <p className="font-medium">{item.label}</p>
                   <p className="text-sm text-gray-400">{item.subtitle}</p>

                  {item.label === 'Raw Materials' && item.value < 20 && (
                  <p className="text-sm text-red-600 font-semibold mt-1">⚠ Low Stock!</p>
                  )}
                </div>
              </div>
            ))}
           </div>
          </CardContent>
         </Card>
     </div>

     
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <div className="flex space-x-2">
              <Input type="search" placeholder="Search orders..." className="w-[200px]" />
              <Button variant="outline" size="sm" className="hover:bg-blue-50">Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Drugs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-blue-50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.hospital}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {order.drugs.map((drug) => (
                        <div key={drug.name} className="text-sm">{drug.name} ({drug.quantity})</div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      order.status === 'shipped'
                        ? 'success'
                        : order.status === 'processing'
                        ? 'secondary'
                        : 'default'
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>${order.totalValue}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="hover:bg-blue-50">View</Button>
                      {order.status === 'pending' && (
                        <Button variant="outline" size="sm" className="hover:bg-green-50">Process</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  )
}
