'use client'

import React from 'react'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabSystemProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
  tabClassName?: string
  activeTabClassName?: string
  inactiveTabClassName?: string
  contentClassName?: string
}

const TabSystem: React.FC<TabSystemProps> = ({
  tabs,
  defaultTab,
  className = '',
  tabClassName = '',
  activeTabClassName = 'bg-white text-primary border-primary',
  inactiveTabClassName = 'bg-sand text-gray-600 hover:text-gray-800',
  contentClassName = '',
}) => {
  const [activeTab, setActiveTab] = React.useState(
    defaultTab || tabs[0]?.id || ''
  )

  if (!tabs.length) return null

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className='mb-6'>
        <div className=''>
          <nav className='flex'>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-12 font-medium text-base transition-colors ${tabClassName} ${
                  activeTab === tab.id
                    ? activeTabClassName
                    : inactiveTabClassName
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className={contentClassName}>
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}

export default TabSystem
