import Image from 'next/image'
import React from 'react'

import Footer from './Footer'

import cityImg from '@/public/svg/cityImg.svg'

const CityImage = () => {
  return (
    <div className='w-full'>
      {/* City Image - Responsive and properly scaled */}
      <div className='relative w-full aspect-[2.88/1]'>
        <Image
          alt='City skyline background'
          src={cityImg}
          className='max-h-auto h-auto min-h-[400px] w-full object-contain object-bottom'
          priority={true}
          fill
        />
      </div>
      <Footer />
    </div>
  )
}

export default CityImage
