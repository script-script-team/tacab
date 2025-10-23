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
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEdit } from 'react-icons/fi'
import Loading from './Loading'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import {
  useGetSingleStudent,
  useUpdateStudent,
} from '@/react-query/student.hooks'

interface FormData {
  name: string
  phone_number: string
}

export function UpdateStudentDialog({ id }: { id: number }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data, isLoading } = useGetSingleStudent(id, {
    queryKey: ['single-student', id],
    enabled: isOpen,
  })
  const { mutate: updateStudent, isPending } = useUpdateStudent()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone_number: '',
    },
  })

  const onSubmit = (data: FormData) => {
    const updateData = {
      id,
      ...data,
    }
    updateStudent(updateData, {
      onSuccess: (res) => {
        toast.success(res.message || 'Updated successfully')
        setIsOpen(false)
        queryClient.invalidateQueries({ queryKey: ['all-students'] })
      },
      onError: (err) => {
        toast.error(err.message || 'Failed to update')
      },
    })
  }

  useEffect(() => {
    if (data?.student.name && data.student.phone_number) {
      reset({
        name: data.student.name || '',
        phone_number: data.student.phone_number || '',
      })
    }
  }, [data, reset])
  return isLoading ? (
    <Loading />
  ) : (
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
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className='text-sm text-red-500'>{errors.name.message}</p>
              )}
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='phone_number'>Number</Label>
              <Input
                id='phone-number'
                {...register('phone_number', {
                  required: 'Number is required',
                })}
              />
              {errors.phone_number && (
                <p className='text-sm text-red-500'>
                  {errors.phone_number.message}
                </p>
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
