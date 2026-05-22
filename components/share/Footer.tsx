import React from 'react'

// Types
interface LegalLink {
  label: string
  href: string
}

// Constants
const LEGAL_LINKS: LegalLink[] = [
  { label: 'Impressum', href: '#' },
  { label: 'AGB', href: '#' },
  { label: 'Datenschutz', href: '#' },
  { label: 'IT-Sicherheit', href: '#' },
]

const COMPANY_INFO = {
  name: 'FinCompare GmbH',
  location: 'Berlin',
}

const DISCLAIMER_TEXT =
  'Unser Angebot richtet sich ausschließlich an Unternehmen'

// Components
const LegalLinks = () => (
  <nav
    aria-label='Legal'
    className='flex  items-start gap-2 text-xs sm:flex-row sm:items-center sm:gap-3 sm:text-sm md:gap-4 mx-auto'
  >
    {LEGAL_LINKS.map(({ label, href }) => (
      <a
        key={label}
        href={href}
        className='py-1 text-gray-500 transition-colors duration-200 hover:text-gray-700'
      >
        {label}
      </a>
    ))}
  </nav>
)

const CompanyInfo = () => (
  <div className='order-2 mx-auto text-center sm:order-1 sm:text-left lg:order-2'>
    <p className='text-xs font-medium text-gray-500 sm:text-sm'>
      {COMPANY_INFO.name}, {COMPANY_INFO.location}
    </p>
  </div>
)

const Disclaimer = () => (
  <div className='order-3 col-span-1 mx-auto text-center sm:col-span-2 sm:text-right lg:col-span-1 lg:text-left'>
    <p className='max-w-xs text-xs leading-relaxed text-gray-400 sm:text-sm lg:max-w-none'>
      {DISCLAIMER_TEXT}
    </p>
  </div>
)

// Main Component
const Footer = () => {
  return (
    <footer className='w-full border-t border-gray-100 bg-white shadow-sm backdrop-blur-sm z-1'>
      <div className='px-3 py-6'>
        <div className=' flex flex-col sm:flex-row items-center justify-center gap-3'>
          <LegalLinks />
          <CompanyInfo />
          <Disclaimer />
        </div>
      </div>
    </footer>
  )
}

export default Footer
