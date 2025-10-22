import type { IUploadInfo } from '@/pages/types/upload.types'
import Badge from './Badge'
import { Button } from './ui/button'

const Upload = ({ term, year, admin, number_of_students }: IUploadInfo) => {
  console.log(admin)
  return (
    <div className='flex flex-col rounded-md bg-gray-100 dark:bg-gray-800'>
      <div className='flex justify-center items-center w-full p-5'>
        <img src='/excel logo.png' className='w-30' />
      </div>
      <div className='dark:bg-gray-900 bg-gray-200 w-full p-5 rounded-bl-md rounded-br-md space-y-2'>
        <div>
          <h1 className='font-bold text-2xl'>{term}</h1>
          <p className='text-gray-500 dark:text-gray-400'>{admin}</p>
        </div>
        <Badge text={String(year)} />
        <h1>
          <strong>Students:</strong> {number_of_students}
        </h1>
        <div className='mt-10'>
          <Button>More details</Button>
        </div>
      </div>
    </div>
  )
}

export default Upload
