import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { RootState } from '@/pages/redux/store'
import { setIsOpen, setSelectedFile } from '@/pages/redux/uploadDialog.slice'
import { FileText } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import type { IStudentProp } from '@/pages/types/student.types'
import { useEffect } from 'react'

export function UploadDialog({ data }: { data: IStudentProp[] }) {
  const uploadDialogState = useSelector(
    (state: RootState) => state.uploadDialog
  )
  const dispatch = useDispatch()

  const handleOpenChange = (open: boolean) => {
    if (open) {
      dispatch(setIsOpen(false))
      dispatch(setSelectedFile(null))
    }
  }

  useEffect(() => {
    if (!data.length) {
      dispatch(setIsOpen(false))
    } else {
      dispatch(setIsOpen(true))
    }
  }, [data, dispatch])

  const headers = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <Dialog
      open={uploadDialogState.isOpen}
      onOpenChange={() => handleOpenChange(uploadDialogState.isOpen)}
    >
      <DialogContent className='sm:max-w-[425px] md:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Preview Upload</DialogTitle>
          <DialogDescription className='flex gap-2'>
            <FileText size={18} /> {uploadDialogState.selectedFile?.name}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-72 overflow-x-hidden'>
          <table className='w-max'>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header} className='border px-2 py-1 text-left'>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {headers.map((header) => (
                    <td key={header} className='border px-2 py-1'>
                      {(() => {
                        const cell: unknown = row[header as keyof typeof row]
                        if (cell === null || cell === undefined) return ''
                        return typeof cell === 'object'
                          ? JSON.stringify(cell)
                          : String(cell)
                      })()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
