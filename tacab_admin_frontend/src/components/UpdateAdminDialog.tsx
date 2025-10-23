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
import type { IAdminProp } from '@/pages/types/admin.types'
import { useUpdateAdmin } from '@/react-query/admin.hooks'
import { useQueryClient } from '@tanstack/react-query'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface FormData {
  id: number
  name: string
  email: string
  phone_number: string
}

export function UpdateAdminDialog({
  iconSize,
  admin,
}: {
  iconSize: number
  admin: IAdminProp
}) {
  const { mutate: updateAdmin, isPending } = useUpdateAdmin()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      id: admin.id,
      name: admin.name || '',
      email: admin.email || '',
      phone_number: admin.phone_number || '',
    },
  })

  const onSubmit = async (data: FormData) => {
    updateAdmin(data, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ['all-admins'] })
        toast.success(res.message || 'Admin info updated successfully!')
        setIsOpen(false)
      },
      onError: (err) => {
        toast.error(err.message || 'Failed to update admin info')
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Pencil size={iconSize} />
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{admin.name}</DialogTitle>
            <DialogDescription>
              Update the administrator&apos;s information. Click save when done.
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
