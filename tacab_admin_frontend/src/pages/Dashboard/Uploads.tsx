import { Button } from '@/components/ui/button'
import Upload from '@/components/Upload'
import { Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setIsOpen, setSelectedFile } from '../redux/uploadDialog.slice'
import { UploadDialog } from '@/components/UploadDialog'
import { useExtractData, useGetAllUploads } from '@/react-query/uploads.hooks'
import Loading from '@/components/Loading'
import { toast } from 'sonner'
import type { IStudentProp } from '../types/student.types'
import { Link } from 'react-router-dom'

function Uploads() {
  const { data: uploads, isLoading } = useGetAllUploads(1)
  const { mutate: extractFile, isPending } = useExtractData()
  const [extractRes, setExtractRes] = useState<IStudentProp[]>()
  const [subject, setSubject] = useState<string>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      dispatch(setSelectedFile(file))
      extractFile(file, {
        onSuccess: (res) => {
          dispatch(setIsOpen(true))
          setExtractRes(res.data)
          setSubject(res.subject)

          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        },
        onError: (err) => {
          toast.error(err.message)
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        },
      })
    }
  }

  return (
    <div className='w-full p-3 flex flex-col bg-white dark:bg-gray-950 rounded-lg h-full space-y-8'>
      <div className='flex justify-end'>
        {isPending ? (
          <Loading />
        ) : (
          <UploadDialog data={extractRes || []} subject={subject || ''} />
        )}
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
          <h1 className='font-medium'>Total uploads: ({uploads?.total})</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4'>
            {uploads?.uploads.slice(0, 3).map((upload, index) => (
              <Upload
                term={upload.term}
                year={upload.year}
                number_of_students={upload._count.students}
                admin={upload.admin.name}
                key={index}
              />
            ))}
          </div>
          <div className='w-full flex justify-center'>
            <Link to={'/results'}>
              <Button variant={'link'}>View More</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Uploads
