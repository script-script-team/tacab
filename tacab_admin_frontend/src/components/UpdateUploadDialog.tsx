import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUpdateUpload } from '@/react-query/uploads.hooks'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEdit } from 'react-icons/fi'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import type { IUploadProp } from '@/pages/types/upload.types'

interface FormData {
  id: string
  term: string
  year: number
}

export function UpdateUploadDialog({ upload }: { upload: IUploadProp }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { mutate: updateUpload, isPending } = useUpdateUpload()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      id: upload.id,
      term: upload.term || '',
      year: upload.year || new Date().getFullYear(),
    },
  })

  const onSubmit = (data: FormData) => {
    updateUpload(data, {
      onSuccess: (res) => {
        toast.success(res.message || 'Updated successfully')
        setIsOpen(false)
        queryClient.invalidateQueries({ queryKey: ['all-uploads'] })
      },
      onError: (err) => {
        toast.error(err.message || 'Failed to update')
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <FiEdit className='cursor-pointer text-blue-500' />
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit upload</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='term'>Name</Label>
              <Input
                id='term'
                {...register('term', { required: 'Name is required' })}
              />
              {errors.term && (
                <p className='text-sm text-red-500'>{errors.term.message}</p>
              )}
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='year'>Year</Label>
              <Input
                id='year'
                type='number'
                {...register('year', { required: 'Year is required' })}
              />
              {errors.year && (
                <p className='text-sm text-red-500'>{errors.year.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' type='button'>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' disabled={isSubmitting || isPending}>
              {isSubmitting || isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
