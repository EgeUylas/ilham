'use client'

import * as React from 'react'
import { createContext, useContext } from 'react'

// Tabs context
type TabsContextValue = {
  selectedTab: string
  setSelectedTab: (id: string) => void
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('useTabs must be used within a Tabs provider')
  }
  return context
}

// Tabs component
interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  ...props
}: TabsProps) {
  const [selectedTab, setSelectedTab] = React.useState(value || defaultValue || '')

  React.useEffect(() => {
    if (value) {
      setSelectedTab(value)
    }
  }, [value])

  const handleTabChange = React.useCallback(
    (tabValue: string) => {
      setSelectedTab(tabValue)
      onValueChange?.(tabValue)
    },
    [onValueChange]
  )

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab: handleTabChange }}>
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

// TabsList component
export function TabsList({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div role="tablist" className="flex" {...props}>
      {children}
    </div>
  )
}

// TabsTrigger component
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export function TabsTrigger({ value, children, ...props }: TabsTriggerProps) {
  const { selectedTab, setSelectedTab } = useTabs()
  const isSelected = selectedTab === value

  return (
    <button
      role="tab"
      aria-selected={isSelected}
      onClick={() => setSelectedTab(value)}
      className={`px-4 py-2 text-sm font-medium transition-all ${
        isSelected
          ? 'text-white border-b-2 border-indigo-500'
          : 'text-gray-400 hover:text-gray-200'
      }`}
      {...props}
    >
      {children}
    </button>
  )
}

// TabsContent component
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export function TabsContent({ value, children, ...props }: TabsContentProps) {
  const { selectedTab } = useTabs()
  const isSelected = selectedTab === value

  if (!isSelected) return null

  return (
    <div role="tabpanel" tabIndex={0} {...props}>
      {children}
    </div>
  )
}
