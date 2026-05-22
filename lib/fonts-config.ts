import localFont from 'next/font/local'

// ✅ Local Proxima Nova font
export const proximaNova = localFont({
  src: [
    {
      path: '../public/fonts/proxima-nova/regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/proxima-nova/light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/proxima-nova/bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/proxima-nova/bold-italic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/proxima-nova/extrabold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/proxima-nova/black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-proxima', // Tailwind-friendly
  display: 'swap', // avoids invisible text
})
