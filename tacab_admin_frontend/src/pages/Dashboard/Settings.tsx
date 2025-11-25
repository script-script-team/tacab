import { useState, useEffect } from 'react'
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
import { useForm } from 'react-hook-form'
import { FiEdit } from 'react-icons/fi'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Eye, EyeOff } from 'lucide-react'
import type { IUpdateUploadRes } from '@/pages/types/upload.types'
import { useGetDefaultPassword } from '@/react-query/defaultPassword.hooks'
import { useChangePassword } from '@/react-query/admin.hooks'

interface FormData {
  defaultPassword: string
  password: string
}

export function Settings() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDefaultPassword, setShowDefaultPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const queryClient = useQueryClient()

  const { data: defaultPasswordData, isLoading: loadingDefault } =
    useGetDefaultPassword()
  const { mutate: changePassword, isPending } = useChangePassword()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      defaultPassword: '',
      password: '',
    },
  })

  useEffect(() => {
    if (defaultPasswordData?.defaultPassword != null) {
      reset({
        defaultPassword: String(defaultPasswordData.defaultPassword.password),
        password: '',
      })
    }
  }, [defaultPasswordData, reset])

  const onSubmit = (data: FormData) => {
    changePassword(data, {
      onSuccess: (res: IUpdateUploadRes) => {
        toast.success(res.message || 'Password updated successfully')
        setIsOpen(false)
        queryClient.invalidateQueries({ queryKey: ['default-password'] })
      },
      onError: (err) => {
        toast.error(err.message || 'Failed to update password')
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className='w-full flex flex-col gap-2 min-h-[83.5vh] rounded-lg bg-white dark:bg-gray-950 p-5'>
          <Button variant='outline'>
            <FiEdit className='mr-2' /> Change Default Password
          </Button>
          <div className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
            Changing the default password will apply only to newly created
            student accounts. Existing students will retain their current
            passwords.
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Change Default Password</DialogTitle>
            <DialogDescription>
              You can change the default password for new users here.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            {/* Current Default Password */}
            <div className='grid gap-2'>
              <Label htmlFor='defaultPassword'>Current Default Password</Label>
              <div className='relative'>
                <Input
                  id='defaultPassword'
                  type={showDefaultPassword ? 'text' : 'password'}
                  {...register('defaultPassword', {
                    required: 'Current password is required',
                  })}
                  className='pr-10'
                  disabled={loadingDefault}
                  placeholder={loadingDefault ? 'Loading...' : ''}
                />
                <button
                  type='button'
                  onClick={() => setShowDefaultPassword((prev) => !prev)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                >
                  {showDefaultPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.defaultPassword && (
                <p className='text-sm text-red-500'>
                  {errors.defaultPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className='grid gap-2'>
              <Label htmlFor='password'>Your Password</Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'New password is required',
                  })}
                  placeholder='Enter your password'
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
              {isSubmitting || isPending ? 'Updating...' : 'Update Password'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
