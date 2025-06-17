'use client'

import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { ThemeProvider } from '@/app/providers/ThemeProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light">
        {children}
      </ThemeProvider>
    </Provider>
  )
} 