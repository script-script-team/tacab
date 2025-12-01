export const InfoItem = ({
  label,
  value,
  isCurrency = false,
}: {
  label: string
  value: string | number | null
  isCurrency?: boolean
}) => (
  <div className='flex flex-col'>
    <span className='text-xs text-gray-500 uppercase tracking-wider font-semibold'>
      {label}
    </span>
    <span
      className={`text-lg font-medium ${
        isCurrency ? 'text-green-600' : 'text-gray-900 dark:text-gray-200'
      }`}
    >
      {value || '-'}
    </span>
  </div>
)
