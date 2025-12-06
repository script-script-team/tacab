import { Button } from '@/components/ui/button'
import {
  useGetAllComputerStudents,
  useGetAllItStudents,
  useSearchStudent,
} from '@/react-query/student.hooks'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import NotFoundMessage from './NotFoundMessage'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Loading from '@/components/Loading'
import ComputerManageStudent from '@/components/ComputerManageStudent'
import { NewStudentDialog } from '@/components/RegisterStudent'
import ITManageStudent from '@/components/ITManageStudent'

const ManageStudents = () => {
  const [page, setPage] = useState(1)
  const [value, SetValue] = useState('')
  const [select, setSelected] = useState('it')
  const { data, isLoading } = useGetAllItStudents(page)
  const { data: comData, isLoading: comLoading } =
    useGetAllComputerStudents(page)
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
    <div className='relative w-full min-h-[83.5vh] p-3 flex flex-col gap-4 bg-white dark:bg-gray-950 rounded-lg h-full'>
      <div className='flex justify-end'>
        <NewStudentDialog />
      </div>
      {!data?.students && !isLoading ? (
        <NotFoundMessage message='No Students found!' />
      ) : (
        <>
          <div className='w-full flex justify-between xs:gap-4 sm:gap-4'>
            <form onSubmit={(e) => e.preventDefault()} className='w-full'>
              <Input
                onChange={(e) => SetValue(e.target.value)}
                className='xs:w-full sm:w-full md:w-[50%] lg:w-[50%] xl:w-[50%]'
                placeholder='Search by ID, name or number'
              />
            </form>
            {!ITSearchStudents && (
              <div className='flex gap-2'>
                {select === 'it' ? (
                  <>
                    <Button
                      className='cursor-pointer'
                      disabled={isLoading || searchLoading || page === 1}
                      onClick={() => setPage(page - 1)}
                    >
                      <ChevronLeft />
                    </Button>
                    <Button
                      className='cursor-pointer'
                      disabled={
                        isLoading ||
                        searchLoading ||
                        page >= (data?.total ?? 0)
                      }
                      onClick={() => setPage(page + 1)}
                    >
                      <ChevronRight />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className='cursor-pointer'
                      disabled={searchLoading || comLoading || page === 1}
                      onClick={() => setPage(page - 1)}
                    >
                      <ChevronLeft />
                    </Button>
                    <Button
                      className='cursor-pointer'
                      disabled={
                        searchLoading ||
                        comLoading ||
                        page >= (comData?.total ?? 0)
                      }
                      onClick={() => setPage(page + 1)}
                    >
                      <ChevronRight />
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className='flex w-full flex-col gap-6'>
            <Tabs defaultValue='it'>
              <TabsList>
                <TabsTrigger onClick={() => {
                  setSelected('it');
                  setPage(1);
                }} value='it'>
                  IT Students
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => {
                    setSelected('computer');
                    setPage(1);
                  }}
                  value='computer'
                >
                  Computer Students
                </TabsTrigger>
              </TabsList>

              {/* IT TAB */}
              <TabsContent value='it'>
                <div className='relative min-h-[200px]'>
                  {(isLoading || searchLoading) && select === 'it' && (
                    <Loading />
                  )}

                  <ITManageStudent students={displayedITStudents || []} />
                </div>
              </TabsContent>

              {/* COMPUTER TAB */}
              <TabsContent value='computer'>
                <div className='relative min-h-[200px]'>
                  {(comLoading || searchLoading) && select === 'computer' && (
                    <Loading />
                  )}

                  <ComputerManageStudent
                    students={displayedComputerStudents || []}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  )
}

export default ManageStudents
