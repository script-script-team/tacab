import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { MdDelete } from 'react-icons/md'
import { PickDate } from '@/components/ui/date'
import { useState } from 'react'
import { useGetAllUploads } from '@/react-query/uploads.hooks'
import Loading from '@/components/Loading'
import { shortText } from '@/lib/utils'
import { UpdateUploadDialog } from '@/components/UpdateUploadDialog'

dayjs.extend(relativeTime)

function Results() {
  const { data: uploads, isLoading } = useGetAllUploads()

  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className='w-full rounded-lg p-4 bg-white dark:bg-gray-950 h-full'>
      <PickDate date={date} setDate={setDate} />
      {isLoading ? (
        <Loading />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Upload Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uploads?.uploads.map((d, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className='font-medium'>
                    {shortText(d.id)}
                  </TableCell>
                  <TableCell>{d.term}</TableCell>
                  <TableCell>{d.year}</TableCell>
                  <TableCell>{d.admin.name}</TableCell>
                  <TableCell>{d.students.length}</TableCell>
                  <TableCell>{dayjs(d.createdAt).fromNow()}</TableCell>
                  <TableCell className='flex gap-2'>
                    <MdDelete className='cursor-pointer text-red-500' />
                    <UpdateUploadDialog id={d.id} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default Results
