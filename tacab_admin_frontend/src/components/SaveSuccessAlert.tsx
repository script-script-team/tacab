import type { ISaveUpload } from '@/pages/types/upload.types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { Check, FileText, Users, ListChecks } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SaveSuccessAlertProps {
  open: boolean
  onOpen: (open: boolean) => void
  data: ISaveUpload
}

const SaveSuccessAlert = ({ open, onOpen, data }: SaveSuccessAlertProps) => {
  const [isDataValid, setIsDataValid] = useState(false)

  useEffect(() => {
    setIsDataValid(!!data)
  }, [data])

  const handleClose = () => {
    onOpen(false)
  }

  if (!isDataValid) {
    return (
      <AlertDialog open={open} onOpenChange={onOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='flex items-center gap-2'>
              <div className='flex h-6 w-6 items-center justify-center rounded-full bg-red-500'>
                <Check className='h-4 w-4 text-white' />
              </div>
              Error
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            No data available to display. The upload may have failed or no data
            was received.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleClose}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-center gap-2'>
            <div className='flex h-6 w-6 items-center justify-center rounded-full bg-green-500'>
              <Check className='h-4 w-4 text-white' />
            </div>
            Upload Successful! 🎉
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className='space-y-4'>
          {/* Summary section */}
          <div className='grid grid-cols-2 gap-4 rounded-lg border p-4'>
            <div className='flex items-center gap-2'>
              <FileText className='h-4 w-4 text-blue-500' />
              <span className='text-sm font-medium'>Message:</span>
            </div>
            <span className='text-sm'>{data?.message}</span>

            <div className='flex items-center gap-2'>
              <Users className='h-4 w-4 text-green-500' />
              <span className='text-sm font-medium'>Upload ID:</span>
            </div>
            <span className='text-sm'>{data?.uploadId}</span>

            <div className='flex items-center gap-2'>
              <ListChecks className='h-4 w-4 text-purple-500' />
              <span className='text-sm font-medium'>Status:</span>
            </div>
            <span className='text-sm font-medium text-green-600'>
              {data?.ok ? 'Success' : 'Failed'}
            </span>
          </div>

          {/* Detailed Summary */}
          {data?.summary && (
            <div className='rounded-lg bg-gray-50 p-3 dark:bg-gray-800'>
              <h4 className='mb-2 font-medium'>Upload Summary:</h4>
              <div className='space-y-1 text-sm'>
                <div className='flex justify-between'>
                  <span>Total:</span>
                  <span>{data.summary.total}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Success:</span>
                  <span>{data.summary.success}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Updated:</span>
                  <span>{data.summary.updated}</span>
                </div>
                <div className='flex justify-between'>
                  <span>New:</span>
                  <span>{data.summary.new}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Duplicates:</span>
                  <span>{data.summary.duplicates}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Errors:</span>
                  <span>{data.summary.errors}</span>
                </div>
              </div>
            </div>
          )}

          <AlertDialogDescription>
            Your data has been saved successfully. You can review it anytime in
            the uploads section.
          </AlertDialogDescription>
        </div>

        <AlertDialogFooter className='flex gap-2'>
          <AlertDialogCancel onClick={handleClose}>Done</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default SaveSuccessAlert
