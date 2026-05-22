import { useEffect, useState } from 'react'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export const useResponsive = () => {
  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs')

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)

    handleResize() // initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (width < 640) setBreakpoint('xs')
    else if (width < 768) setBreakpoint('sm')
    else if (width < 1024) setBreakpoint('md')
    else if (width < 1280) setBreakpoint('lg')
    else if (width < 1536) setBreakpoint('xl')
    else setBreakpoint('2xl')
  }, [width])

  return {
    width,
    breakpoint,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2xl: breakpoint === '2xl',
  }
}
