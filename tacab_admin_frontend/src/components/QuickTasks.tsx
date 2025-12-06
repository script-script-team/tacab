import { NewAdminDialog } from './NewAdminDialog'
import { NewPaymentDialog } from './NewPaymentDialog'
import { NewStudentDialog } from './RegisterStudent'

const QuickTasks = () => {
  return (
    <div className='rounded-lg bg-white dark:bg-gray-950 p-4 flex flex-col gap-4'>
      <h3 className='text-gray-400 font-medium'>Quick Tasks:</h3>
      <div className='w-full flex flex-wrap gap-3'>
        <NewPaymentDialog />
        <NewAdminDialog />
        <NewStudentDialog />
      </div>
    </div>
  )
}

export default QuickTasks
