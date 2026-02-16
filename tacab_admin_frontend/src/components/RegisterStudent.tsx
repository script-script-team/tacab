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
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useRegisterStudent } from '@/react-query/student.hooks'

interface FormData {
  name: string
  phone_number: string
  password: string
  subject: 'IT' | 'Computer' | ''
}

export function NewStudentDialog() {
  const { mutate: newStudent, isPending } = useRegisterStudent()
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone_number: '',
      password: '',
      subject: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      newStudent(data, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: ['it-students'] })
          queryClient.invalidateQueries({ queryKey: ['computer-students'] })
          toast.success(res.message || 'Student created successfully')
        },
        onError: (err) => {
          toast.error(err.message || 'Failed to create student')
        },
      })
    } catch (err) {
      toast.error('Failed to create student')
      console.error(err)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Register Student
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Register Student</DialogTitle>
            <DialogDescription>
              Register new student. Enter the student's info.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 my-5'>
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
              <Label htmlFor='phone_number'>Phone Number</Label>
              <Input
                id='phone_number'
                {...register('phone_number', {
                  required: 'Phone number is required',
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
              <Input
                id='password'
                type='password'
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
                <p className='text-sm text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='subject'>Subject</Label>
              <Select
                onValueChange={(value) =>
                  setValue('subject', value as 'IT' | 'Computer' | '')
                }
                defaultValue=''
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select a subject' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='IT'>IT</SelectItem>
                  <SelectItem value='Computer'>Computer</SelectItem>
                </SelectContent>
              </Select>
              {errors.subject && (
                <p className='text-sm text-red-500'>{errors.subject.message}</p>
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
              {isSubmitting || isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
