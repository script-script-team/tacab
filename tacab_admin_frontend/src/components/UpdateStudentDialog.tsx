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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEdit } from 'react-icons/fi'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdateStudent } from '@/react-query/student.hooks'
import type { IFullStudentProp } from '@/pages/types/student.types'
import { Eye, EyeOff } from 'lucide-react'

interface FormData {
  id: number
  name: string
  phone_number: string
  password: string
}

export function UpdateStudentDialog({
  student,
}: {
  student: IFullStudentProp
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { mutate: updateStudent, isPending } = useUpdateStudent()
  const [showPassword, setShowPassword] = useState(false)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      id: student.id,
      name: student.name || '',
      phone_number: student.phone_number || '',
      password: student.password || '',
    },
  })

  const onSubmit = (data: FormData) => {
    updateStudent(data, {
      onSuccess: (res) => {
        toast.success(res.message || 'Updated successfully')
        setIsOpen(false)
        queryClient.invalidateQueries({ queryKey: ['it-students'] })
        queryClient.invalidateQueries({ queryKey: ['computer-students'] })
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

            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>

              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className='pr-10'
                />

                <button
                  type='button'
                  onClick={() => setShowPassword((prev) => !prev)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className='text-sm text-red-500'>
                  {errors.password.message}
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
