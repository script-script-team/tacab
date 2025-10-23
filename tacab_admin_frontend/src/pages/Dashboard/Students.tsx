import ComputerStudentTable from '@/components/ComputerStudentTable'
import ITStudentsTable from '@/components/ITStudentsTable'
import Loading from '@/components/Loading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetAllStudents } from '@/react-query/student.hooks'

function Students() {
  const { data, isLoading } = useGetAllStudents()

  const ITStudents = data?.students.filter((std) => std.subject === 'IT')
  const ComputerStudents = data?.students.filter(
    (std) => std.subject === 'Computer'
  )

  return (
    <div className='w-full min-h-[95vh] rounded-lg bg-white dark:bg-gray-950 p-5'>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='flex w-full flex-col gap-6'>
          <Tabs defaultValue='it'>
            <TabsList>
              <TabsTrigger value='it'>IT Students</TabsTrigger>
              <TabsTrigger value='computer'>Computer Students</TabsTrigger>
            </TabsList>
            <TabsContent value='it'>
              <ITStudentsTable students={ITStudents || []} />
            </TabsContent>
            <TabsContent value='computer'>
              <ComputerStudentTable students={ComputerStudents || []} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

export default Students
