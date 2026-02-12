export const Badge = ({
  text,
  variant = 'secondary',
  children,
}: {
  text?: string
  variant?: 'success' | 'warning' | 'destructive' | 'secondary'
  children?: React.ReactNode
}) => {
  const content = text || children
  let className = 'px-3 py-[3px] rounded-full text-sm font-medium w-fit '

  switch (variant) {
    case 'success':
      className += 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      break
    case 'warning':
      className += 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      break
    case 'destructive':
      className += 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      break
    default:
      className += 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  }

  return (
    <div className={className}>
      {content}
    </div>
  )
}
