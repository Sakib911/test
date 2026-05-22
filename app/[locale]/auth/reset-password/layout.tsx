import { Suspense } from 'react'

const ResetPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense>{children}</Suspense>
}

export default ResetPasswordLayout
