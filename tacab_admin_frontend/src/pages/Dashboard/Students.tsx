import ComputerStudentTable from '@/components/ComputerStudentTable'
import ITStudentsTable from '@/components/ITStudentsTable'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  useGetAllStudents,
  useSearchStudent,
} from '@/react-query/student.hooks'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

function Students() {
  const [page, setPage] = useState(1)
  const [value, SetValue] = useState('')
  const { data, isLoading } = useGetAllStudents(page)
  const { data: student, isFetching } = useSearchStudent(value)

  const ITStudents = data?.students?.filter((std) => std.subject === 'IT')
  const ComputerStudents = data?.students?.filter(
    (std) => std.subject === 'Computer'
  )
  const ITSearchStudents = student?.students?.filter(
    (std) => std.subject === 'IT'
  )
  const ComputerSearchStudents = student?.students?.filter(
    (std) => std.subject === 'Computer'
  )

  const displayedITStudents =
    value && ITSearchStudents?.length ? ITSearchStudents : ITStudents
  const displayedComputerStudents =
    value && ComputerSearchStudents?.length
      ? ComputerSearchStudents
      : ComputerStudents

  return (
    <div className='w-full flex flex-col gap-4 min-h-[83.5vh] rounded-lg bg-white dark:bg-gray-950 p-5'>
      <div className='w-full flex justify-between'>
        <form onSubmit={(e) => e.preventDefault()} className='w-full'>
          <Input
            onChange={(e) => SetValue(e.target.value)}
            className='xs:w-full sm:w-full md:w-[50%] lg:w-[50%] xl:w-[50%]'
            placeholder='Search by name or phone number'
          />
        </form>
        {!ITSearchStudents && (
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
              disabled={isLoading || isFetching || page >= (data?.total ?? 0)}
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
        <div className='flex w-full flex-col gap-6'>
          <Tabs defaultValue='it'>
            <TabsList>
              <TabsTrigger value='it'>IT Students</TabsTrigger>
              <TabsTrigger value='computer'>Computer Students</TabsTrigger>
            </TabsList>
            <TabsContent value='it'>
              <ITStudentsTable students={displayedITStudents || []} />
            </TabsContent>
            <TabsContent value='computer'>
              <ComputerStudentTable
                students={displayedComputerStudents || []}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

export default Students
