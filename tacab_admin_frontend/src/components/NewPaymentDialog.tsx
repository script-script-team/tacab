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
import type { IGetStudentByStudentCodeRes } from '@/pages/types/student.types'
import type { IUpdateUploadRes } from '@/pages/types/upload.types'
import { useAddPayment } from '@/react-query/payment.hooks'
import { useGetStudentByStudentCode } from '@/react-query/student.hooks'
import { useQueryClient } from '@tanstack/react-query'
import { Check, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface FormData {
  amount: number
  student_id: string
  month: string
  year: string
}

export function NewPaymentDialog() {
  const [studentName, setStudentName] = useState('')
  const { mutate: createPayment, isPending } = useAddPayment()
  const {
    mutate: getStudentByStudentCode,
    isPending: isPendingGetStudentByStudentCode,
  } = useGetStudentByStudentCode()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      amount: 0,
      student_id: '',
      month: new Date().toLocaleString('en-US', { month: 'long' }),
      year: String(new Date().getFullYear()),
    },
  })

  const monthValue = watch('month')

  const onSubmit = async (data: FormData) => {
    try {
      createPayment(data, {
        onSuccess: (res: IUpdateUploadRes) => {
          queryClient.invalidateQueries({ queryKey: ['all-it-payments'] })
          queryClient.invalidateQueries({ queryKey: ['all-computer-payments'] })
          toast.success(res.message || 'Payment added successfully')
        },
        onError: (err: Error) => {
          toast.error(err.message || 'Failed to add payment')
        },
      })
    } catch (err) {
      toast.error('Failed to add payment')
      console.error(err)
    }
  }

  const handleSearch = async (student_id: string) => {
    if (!student_id.trim()) {
      toast.error('Please enter a student ID')
      return
    }

    try {
      getStudentByStudentCode(student_id, {
        onSuccess: (res: IGetStudentByStudentCodeRes) => {
          setStudentName(res.name)
        },
        onError: (err: Error) => {
          toast.error(err.message || 'Failed to find student')
          setStudentName('')
        },
      })
    } catch (err) {
      toast.error('Failed to find student')
      console.error(err)
      setStudentName('')
    }
  }

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === 'student_id') {
        setStudentName('')
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Payment
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>New Payment</DialogTitle>
            <DialogDescription>
              Enter the payment information of the student.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 my-5'>
            {/* Student ID */}
            <div className='grid gap-2'>
              <Label htmlFor='student_id'>Student ID</Label>
              <div className='flex items-center gap-2'>
                <Input
                  id='student_id'
                  type='text'
                  autoComplete='off'
                  {...register('student_id', {
                    required: 'Student ID is required',
                  })}
                />
                <Button
                  type='button'
                  onClick={() => handleSearch(getValues('student_id'))}
                  disabled={isPendingGetStudentByStudentCode || isPending}
                >
                  {isPendingGetStudentByStudentCode ? '...' : <Check />}
                </Button>
              </div>
              {errors.student_id && (
                <p className='text-sm text-red-500'>
                  {errors.student_id.message}
                </p>
              )}
            </div>

            <div className='grid gap-2'>
              <Label>Student Name</Label>
              <Input id='name' type='text' value={studentName} disabled />
            </div>

            {/* Amount */}
            <div className='grid gap-2'>
              <Label htmlFor='amount'>Amount</Label>
              <Input
                id='amount'
                type='number'
                {...register('amount', {
                  required: 'Amount is required',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Amount must be positive' },
                })}
              />
              {errors.amount && (
                <p className='text-sm text-red-500'>{errors.amount.message}</p>
              )}
            </div>

            {/* Month */}
            <div className='grid gap-2'>
              <Label htmlFor='month'>Month</Label>
              <Select
                onValueChange={(value) => {
                  setValue('month', value)
                }}
                value={monthValue}
                defaultValue={new Date().toLocaleString('en-US', {
                  month: 'long',
                })}
              >
                <SelectTrigger id='month' className='w-full'>
                  <SelectValue placeholder='Select a month' />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ].map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.month && (
                <p className='text-sm text-red-500'>{errors.month.message}</p>
              )}
            </div>

            {/* Year */}
            <div className='grid gap-2'>
              <Label htmlFor='year'>Year</Label>
              <Input
                id='year'
                type='number'
                {...register('year', {
                  required: 'Year is required',
                  min: { value: 2000, message: 'Year must be after 2000' },
                  max: {
                    value: 2100,
                    message: 'Year must be before 2100',
                  },
                })}
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
              {isSubmitting || isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
