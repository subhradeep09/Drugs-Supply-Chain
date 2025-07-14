'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/store'
import { logout } from '@/lib/features/auth/authSlice'
import { ThemeToggle } from '@/app/ui/ThemeToggle'
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { NotificationDropdown } from '@/app/ui/NotificationDropdown'
import { UserProfileDropdown } from '@/app/ui/UserProfileDropdown'

const navigation = [
  { name: 'Home', href: '/', roles: ['ADMIN', 'HOSPITAL', 'PHARMACY', 'VENDOR'] },
  { name: 'About Us', href: '/about', roles: ['ADMIN', 'HOSPITAL', 'PHARMACY', 'VENDOR'] },
  { name: 'Features', href: '/features', roles: ['ADMIN', 'HOSPITAL', 'PHARMACY', 'VENDOR'] },
  { name: 'Contact', href: '/contact', roles: ['ADMIN', 'HOSPITAL', 'PHARMACY', 'VENDOR'] },
]

const roleBasedNavigation = {
  ADMIN: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'User Management', href: '/users' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Settings', href: '/settings' },
  ],
  HOSPITAL: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Orders', href: '/orders' },
    { name: 'Settings', href: '/settings' },
  ],
  PHARMACY: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Orders', href: '/orders' },
    { name: 'Settings', href: '/settings' },
  ],
  VENDOR: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Orders', href: '/orders' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Settings', href: '/settings' },
  ],
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
    setIsProfileOpen(false)
  }, [pathname])

  const handleLogout = () => {
    dispatch(logout())
    router.push('/sign-in')
  }

  const filteredNavigation = isAuthenticated
    ? [...navigation, ...(roleBasedNavigation[user?.role as keyof typeof roleBasedNavigation] || [])]
    : navigation

  return (
    <nav
      className={`fixed top-0 z-50 w-full h-16 transition-all duration-300 bg-white dark:bg-gray-900 border-b border-gray-200 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 hover-lift">
              <span className="text-xl font-bold gradient-text">
                DrugChain
              </span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              {filteredNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-primary to-primary/60" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <button className="relative rounded-full p-1.5 text-muted-foreground hover:text-primary hover-glow transition-colors">
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                    3
                  </span>
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 rounded-full p-1.5 text-muted-foreground hover:text-primary hover-glow transition-colors"
                  >
                    <UserCircleIcon className="h-6 w-6" />
                    <div className="text-left">
                      <span className="text-sm font-medium block">{user?.name}</span>
                      <span className="text-xs text-muted-foreground block">{user?.role}</span>
                    </div>
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl glass py-1 shadow-soft ring-1 ring-border focus:outline-none">
                      <div className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                        <div className="font-medium">{user?.name}</div>
                        <div className="text-xs">{user?.role}</div>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                      >
                        <UserCircleIcon className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                      >
                        <Cog6ToothIcon className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {filteredNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-accent text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {isAuthenticated ? (
            <div className="border-t border-border px-4 pb-3 pt-4">
              <div className="flex items-center">
                <UserCircleIcon className="h-8 w-8 text-muted-foreground" />
                <div className="ml-3">
                  <div className="text-base font-medium">{user?.name}</div>
                  <div className="text-sm text-muted-foreground">{user?.role}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  href="/profile"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t border-border px-4 pb-3 pt-4">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/sign-in"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-primary text-center"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  )
} 