import type { IFullStudentProp } from '@/pages/types/student.types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import DeleteStudentDialog from './DeleteStudentDialog'
import { UpdateStudentDialog } from './UpdateStudentDialog'
import NotFoundMessage from '@/pages/Dashboard/NotFoundMessage'
import { Link } from 'react-router-dom'

const ComputerStudentTable = ({
  students,
}: {
  students: IFullStudentProp[]
}) => {
  return !students.length ? (
    <NotFoundMessage message='No Computer students found!' />
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>windows</TableHead>
          <TableHead>word</TableHead>
          <TableHead>excel</TableHead>
          <TableHead>Power point</TableHead>
          <TableHead>access</TableHead>
          <TableHead>publisher</TableHead>
          <TableHead>outlook</TableHead>
          <TableHead>computer literacy</TableHead>
          <TableHead>Average</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((d, i) => {
          return (
            <TableRow key={i}>
              <TableCell className='font-medium'>
                <Link
                  to={`/manage-students/${d.id}`}
                  className='hover:text-blue-400 transition'
                >
                  {d.student_code}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  to={`/manage-students/${d.id}`}
                  className='hover:text-blue-400 transition'
                >
                  {d.name}
                </Link>
              </TableCell>
              <TableCell>{d.phone_number}</TableCell>
              <TableCell>{d.subject}</TableCell>
              <TableCell>{d.marks?.windows ?? '-'}</TableCell>
              <TableCell>{d.marks?.word ?? '-'}</TableCell>
              <TableCell>{d.marks?.excel ?? '-'}</TableCell>
              <TableCell>{d.marks?.power_point ?? '-'}</TableCell>
              <TableCell>{d.marks?.access ?? '-'}</TableCell>
              <TableCell>{d.marks?.publisher ?? '-'}</TableCell>
              <TableCell>{d.marks?.outlook ?? '-'}</TableCell>
              <TableCell>{d.marks?.computer_literacy ?? '-'}</TableCell>
              <TableCell>{d.marks?.average ?? '-'}</TableCell>
              <TableCell>{d.marks?.grade ?? '-'}</TableCell>

              <TableCell className='flex gap-2'>
                <DeleteStudentDialog id={d.id} />
                <UpdateStudentDialog student={d} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ComputerStudentTable
