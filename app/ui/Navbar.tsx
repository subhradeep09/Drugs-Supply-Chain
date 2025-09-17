'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { RootState } from '@/lib/store'
import Image from 'next/image'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector((state: RootState) => state.auth)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image 
                src="/logo.png" 
                alt="PharmaChain Logo" 
                width={200} 
                height={200} 
                className="rounded-lg transition-transform duration-300 group-hover:scale-110"
              />
              <div className="" />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 px-3 py-2 rounded-lg">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 px-3 py-2 rounded-lg">
              About
            </Link>
            <Link href="/features" className="text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 px-3 py-2 rounded-lg">
              Features
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 px-3 py-2 rounded-lg">
              Contact
            </Link>

            {user ? (
              <Link href="/dashboard" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/sign-in" className="text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 px-3 py-2 rounded-lg">
                  Sign In
                </Link>
                <Link href="/register" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors duration-200">
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              <Link href="/" onClick={toggleMenu} className="block text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 px-3 py-2 rounded-lg">
                Home
              </Link>
              <Link href="/about" onClick={toggleMenu} className="block text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 px-3 py-2 rounded-lg">
                About
              </Link>
              <Link href="/features" onClick={toggleMenu} className="block text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 px-3 py-2 rounded-lg">
                Features
              </Link>
              <Link href="/contact" onClick={toggleMenu} className="block text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 px-3 py-2 rounded-lg">
                Contact
              </Link>

              {user ? (
                <Link href="/dashboard" onClick={toggleMenu} className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl mt-4">
                  Dashboard
                </Link>
              ) : (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <Link href="/sign-in" onClick={toggleMenu} className="block text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 px-3 py-2 rounded-lg">
                    Sign In
                  </Link>
                  <Link href="/register" onClick={toggleMenu} className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar