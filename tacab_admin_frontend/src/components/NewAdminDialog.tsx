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
import { ROLE } from '@/pages/types/admin.types'
import { useCreateAdmin } from '@/react-query/admin.hooks'
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
import { useState } from 'react'

interface FormData {
  name: string
  email: string
  phone_number: string
  role: ROLE
  password: string
  confirm_password: string
}

export function NewAdminDialog() {
  const { mutate: newAdmin, isPending } = useCreateAdmin()
  const [roleValue, setValue] = useState<ROLE>(ROLE.REGISTRATION)
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      role: roleValue,
      password: '',
      confirm_password: '',
    },
  })

  const password = watch('password')

  const onSubmit = async (data: FormData) => {
    try {
      newAdmin(data, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: ['all-admins'] })
          toast.success(res.message || 'Admin created successfully')
        },
        onError: (err) => {
          toast.error(err.message || 'Failed to create admin')
        },
      })
    } catch (err) {
      toast.error('Failed to create admin')
      console.error(err)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add admin
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>New Admin</DialogTitle>
            <DialogDescription>
              Create a new administrator account. Enter the admin's info.
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
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className='text-sm text-red-500'>{errors.email.message}</p>
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
              <Label htmlFor='role'>Role</Label>
              <Select
                onValueChange={(value: ROLE) => {
                  setValue(value as ROLE)
                }}
                value={roleValue}
                defaultValue={ROLE.REGISTRATION}
              >
                <SelectTrigger id='role' className='w-full'>
                  <SelectValue placeholder='Select a role' />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ROLE).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && (
                <p className='text-sm text-red-500'>{errors.role.message}</p>
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
              <Label htmlFor='confirm_password'>Confirm Password</Label>
              <Input
                id='confirm_password'
                type='password'
                {...register('confirm_password', {
                  required: 'Please confirm password',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
              />
              {errors.confirm_password && (
                <p className='text-sm text-red-500'>
                  {errors.confirm_password.message}
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
              {isSubmitting || isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
