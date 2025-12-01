export const ProgressBar = ({
  percent,
  count,
}: {
  percent: number
  count: number
}) => (
  <div className='w-full bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800'>
    <div className='flex justify-between items-end mb-2'>
      <div>
        <h3 className='text-lg font-bold text-gray-800 dark:text-gray-200'>
          Payment Progress
        </h3>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          {count} of 8 months completed
        </p>
      </div>
      <span className='text-2xl font-bold text-blue-600'>
        {Math.round(percent)}%
      </span>
    </div>
    <div className='w-full bg-gray-200 dark:bg-gray-800 rounded-full h-4 overflow-hidden'>
      <div
        className='bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out'
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  </div>
)
