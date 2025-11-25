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

const ITStudentsTable = ({ students }: { students: IFullStudentProp[] }) => {
  return !students.length ? (
    <NotFoundMessage message='No IT students found!' />
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Password</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>A+</TableHead>
          <TableHead>Multimedia</TableHead>
          <TableHead>Web Desing</TableHead>
          <TableHead>Networking</TableHead>
          <TableHead>Database</TableHead>
          <TableHead>Programming</TableHead>
          <TableHead>Grade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((d, i) => {
          return (
            <TableRow key={i}>
              <TableCell className='font-medium'>{d.student_code}</TableCell>
              <TableCell>{d.password}</TableCell>
              <TableCell>{d.name}</TableCell>
              <TableCell>{d.phone_number}</TableCell>
              <TableCell>{d.subject}</TableCell>
              <TableCell>{d.marks.a_plus}</TableCell>
              <TableCell>{d.marks.multimedia}</TableCell>
              <TableCell>{d.marks.web_desing}</TableCell>
              <TableCell>{d.marks.networking}</TableCell>
              <TableCell>{d.marks.database}</TableCell>
              <TableCell>{d.marks.programming}</TableCell>
              <TableCell>{d.marks.grade}</TableCell>
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

export default ITStudentsTable
