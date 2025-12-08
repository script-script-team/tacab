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
import { PickDate } from '@/components/ui/date'
import { useState } from 'react'
import { SearchUploads, useGetAllUploads } from '@/react-query/uploads.hooks'
import Loading from '@/components/Loading'
import { shortText } from '@/lib/utils'
import { UpdateUploadDialog } from '@/components/UpdateUploadDialog'
import DeleteUploadDialog from '@/components/DeleteUploadDialog'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import NotFoundMessage from './NotFoundMessage'

dayjs.extend(relativeTime)

function Results() {
  const [page, setPage] = useState(1)
  const { data: uploads, isLoading } = useGetAllUploads(page)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const { data: search, isFetching } = SearchUploads(
    date ? date.getFullYear().toString() : ''
  )

  const fillter = search ? search : uploads

  return (
    <div className='relative w-full min-h-[83.5vh] rounded-lg p-4 bg-white dark:bg-gray-950 h-full'>
      {!uploads?.uploads.length ? (
        <NotFoundMessage message='No Uploads Found!' />
      ) : (
        <>
          <div className='flex justify-between'>
            <PickDate date={date} setDate={setDate} />
            {!search && (
              <div className='flex gap-2'>
                <Button
                  className='cursor-pointer'
                  disabled={isLoading || isFetching || page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  className='cursor-pointer'
                  disabled={
                    isLoading ||
                    isFetching ||
                    (uploads?.totalPage ? page >= uploads.totalPage : false)
                  }
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
          </div>
          {isLoading || isFetching ? (
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
                {fillter?.uploads?.map((d, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell className='font-medium'>
                        {shortText(d.id)}
                      </TableCell>
                      <TableCell>{d.term}</TableCell>
                      <TableCell>{d.year}</TableCell>
                      <TableCell>{d.admin?.name}</TableCell>
                      <TableCell>{d._count?.students}</TableCell>
                      <TableCell>{dayjs(d.createdAt).fromNow()}</TableCell>
                      <TableCell className='flex gap-2'>
                        <DeleteUploadDialog id={d.id} />
                        <UpdateUploadDialog upload={d} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </div>
  )
}

export default Results
