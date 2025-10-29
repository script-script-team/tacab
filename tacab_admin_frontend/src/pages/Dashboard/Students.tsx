import ComputerStudentTable from '@/components/ComputerStudentTable'
import ITStudentsTable from '@/components/ITStudentsTable'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  useGetAllComputerStudents,
  useGetAllItStudents,
  useSearchStudent,
} from '@/react-query/student.hooks'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

function Students() {
  const [itPage, setItPage] = useState(1)
  const [comPage, setComPage] = useState(1)
  const [value, SetValue] = useState('')
  const [select, setSelected] = useState('it')
  const { data, isLoading } = useGetAllItStudents(itPage)
  const { data: comData, isLoading: comLoading } = useGetAllComputerStudents(comPage)
  const { data: student, isLoading: searchLoading } = useSearchStudent(value)

  const ITStudents = data?.students
  const ComputerStudents = comData?.students
  const ITSearchStudents = student?.students
  const ComputerSearchStudents = student?.students

  const displayedITStudents =
    value && ITSearchStudents?.length ? ITSearchStudents : ITStudents
  const displayedComputerStudents =
    value && ComputerSearchStudents?.length
      ? ComputerSearchStudents
      : ComputerStudents

  return (
    <div className='relative w-full flex flex-col gap-4 min-h-[83.5vh] rounded-lg bg-white dark:bg-gray-950 p-5'>
      <div className='w-full flex justify-between xs:gap-4 sm:gap-4'>
        <form onSubmit={(e) => e.preventDefault()} className='w-full'>
          <Input
            onChange={(e) => SetValue(e.target.value)}
            className='xs:w-full sm:w-full md:w-[50%] lg:w-[50%] xl:w-[50%]'
            placeholder='Search by name or number'
          />
        </form>
        {!ITSearchStudents && (
          <div className='flex gap-2'>
            {select === "it" ? <>
            <Button
              className='cursor-pointer'
              disabled={isLoading || searchLoading || itPage === 1}
              onClick={() => setItPage(itPage - 1)}
            >
              <ChevronLeft />
            </Button>
            <Button
              className='cursor-pointer'
              disabled={isLoading || searchLoading || itPage >= (data?.total ?? 0)}
              onClick={() => setItPage(itPage + 1)}
            >
              <ChevronRight />
            </Button>
            </>: <>
            <Button
              className='cursor-pointer'
              disabled={searchLoading || comLoading || comPage === 1}
              onClick={() => setComPage(comPage - 1)}
            >
              <ChevronLeft />
            </Button>
            <Button
              className='cursor-pointer'
              disabled={searchLoading || comLoading || comPage >= (comData?.total ?? 0)}
              onClick={() => setComPage(comPage + 1)}
            >
              <ChevronRight />
            </Button>
            </>}
          </div>
        )}
      </div>
      {isLoading || searchLoading || comLoading ? (
        <Loading />
      ) : (
        <div className='flex w-full flex-col gap-6'>
          <Tabs defaultValue='it'>
            <TabsList>
              <TabsTrigger onClick={() => setSelected("it")} value='it'>IT Students</TabsTrigger>
              <TabsTrigger onClick={() => setSelected("computer")} value='computer'>Computer Students</TabsTrigger>
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
