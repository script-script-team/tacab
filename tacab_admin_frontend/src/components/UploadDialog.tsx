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
import { useEffect, useState } from 'react'
import { useSaveData } from '@/react-query/uploads.hooks'
import { toast } from 'sonner'
import Loading from './Loading'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ISaveUpload } from '@/pages/types/upload.types'
import SaveSuccessAlert from './SaveSuccessAlert'

export function UploadDialog({
  data,
  subject,
}: {
  data: IStudentProp[]
  subject: string
}) {
  const uploadDialogState = useSelector(
    (state: RootState) => state.uploadDialog
  )
  const dispatch = useDispatch()
  const { mutate: saveData, isPending } = useSaveData()
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false)
  const [saveRes, setSaveRes] = useState<ISaveUpload>()

  const handleOpenChange = (open: boolean) => {
    if (open) {
      dispatch(setIsOpen(false))
      dispatch(setSelectedFile(null))
    }
  }

  const handleSave = (term: string, year: number) => {
    dispatch(setIsOpen(false))
    const saveDataInp = {
      subject,
      data,
      term,
      year,
    }
    saveData(saveDataInp, {
      onSuccess: (res) => {
        setIsSuccessOpen(true)
        setSaveRes(res)
      },
      onError: (err) => {
        toast.error(err.message)
      },
    })
  }

  const formSchema = z.object({
    term: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    year: z.number({
      message: 'Enter valid year',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      term: '',
      year: new Date().getFullYear(),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSave(values.term, values.year)
  }

  useEffect(() => {
    if (!data.length || subject.trim() === '') {
      dispatch(setIsOpen(false))
    } else {
      dispatch(setIsOpen(true))
    }
  }, [data, dispatch, subject])

  const headers = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <>
      <SaveSuccessAlert
        open={isSuccessOpen}
        onOpen={(open: boolean) => setIsSuccessOpen(open)}
        data={saveRes!}
      />
      {isPending ? (
        <Loading />
      ) : (
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8 w-full max-w-md mx-auto'
              >
                <FormField
                  control={form.control}
                  name='term'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Term</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g September' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='year'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='e.g 2025'
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ScrollArea className='h-50 overflow-x-hidden'>
                  <table className='w-max'>
                    <thead>
                      <tr>
                        {headers.map((header) => (
                          <th
                            key={header}
                            className='border px-2 py-1 text-left'
                          >
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
                                const cell: unknown =
                                  row[header as keyof typeof row]
                                if (cell === null || cell === undefined)
                                  return ''
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
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
