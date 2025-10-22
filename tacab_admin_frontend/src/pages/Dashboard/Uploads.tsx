import DashboardHeader from '@/components/DashboardHeader'
import { Button } from '@/components/ui/button'
import Upload from '@/components/Upload'
import { Plus } from 'lucide-react'
import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setIsOpen, setSelectedFile } from '../redux/uploadDialog.slice'
import { UploadDialog } from '@/components/UploadDialog'
import { useGetAllUploads } from '@/react-query/uploads.hooks'
import Loading from '@/components/Loading'

function Uploads() {
  const { data: uploads, isLoading } = useGetAllUploads()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      dispatch(setIsOpen(true))
      dispatch(setSelectedFile(file))
    }
  }

  return (
    <div className='w-full min-h-[95vh] h-full flex flex-col gap-2 rounded-lg overflow-hidden'>
      <UploadDialog />
      <DashboardHeader />

      <div className='flex w-full h-full gap-2 xs:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row flex-1'>
        <div className='w-full flex flex-col gap-2 flex-1 min-h-[80vh]'>
          <div className='w-full p-3 flex flex-col bg-white dark:bg-gray-950 rounded-lg h-full space-y-8'>
            <div className='flex justify-end'>
              <Button onClick={handleButtonClick}>
                <Plus />
                Upload File
              </Button>
              <input
                ref={fileInputRef}
                type='file'
                accept='.xlsx,.xls,.xlsm,.xlsb,.xltx,.xltm,.xlt,.xml,.xlw,.xlr'
                multiple={false}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <div className='space-y-2'>
                <h1 className='font-medium'>
                  Total uploads: ({uploads?.total})
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4'>
                  {uploads?.uploads.slice(0, 3).map((upload, index) => (
                    <Upload
                      term={upload.term}
                      year={upload.year}
                      number_of_students={upload.students.length}
                      admin={upload.admin.name}
                      key={index}
                    />
                  ))}
                </div>
                <div className='w-full flex justify-center'>
                  <Button variant={'link'}>View More</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Uploads
