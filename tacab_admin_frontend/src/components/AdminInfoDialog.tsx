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
import { Label } from '@/components/ui/label'
import type { IAdminProp } from '@/pages/types/admin.types'
import { useGetAdminSummary } from '@/react-query/admin.hooks'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Eye } from 'lucide-react'
import { useState } from 'react'
import Loading from './Loading'

dayjs.extend(relativeTime)

export function AdminInfoDialog({
  iconSize,
  admin,
}: {
  iconSize: number
  admin: IAdminProp
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data, isLoading } = useGetAdminSummary(admin.id, {
    queryKey: ['admin-summary', admin.id],
    enabled: isOpen,
  })

  const adminInfo = [
    { key: 'Email', value: admin.email },
    { key: 'Phone number', value: admin.phone_number },
    {
      key: 'Joined',
      value: `${dayjs(admin.createdAt).format('MMMM D, YYYY')} (${dayjs(
        admin.createdAt
      ).fromNow()})`,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Eye size={iconSize} />
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>{admin.name}</DialogTitle>
            <DialogDescription>
              Here is the summary of this admin.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-1'>
            {adminInfo.map((a, i) => (
              <div className='flex gap-2 items-center' key={i}>
                <Label htmlFor='name-1'>{a.key}:</Label>
                <p>{a.value}</p>
              </div>
            ))}
          </div>

          {isLoading ? (
            <div className='relative mt-5'>
              <Loading />
            </div>
          ) : (
            <div className='grid gap-1'>
              <div className='flex gap-2 items-center'>
                <Label htmlFor='name-1'>Uploads:</Label>
                <p>
                  {data?.data.totalUploads || 0} ({data?.data.totalStudents}{' '}
                  students)
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Done</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
