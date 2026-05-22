import { Loader2 } from 'lucide-react'

const Loading = ({
  text,
  loaderClassName,
}: {
  text: string
  loaderClassName?: string
}) => {
  return (
    <div className='flex items-center justify-center gap-2 text-muted-foreground'>
      <Loader2 className={`h-4 w-4 animate-spin ${loaderClassName}`} />
      <span>{text || 'Loading...'}</span>
    </div>
  )
}

export default Loading
