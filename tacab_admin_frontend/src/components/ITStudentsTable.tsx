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

const ITStudentsTable = ({ students }: { students: IFullStudentProp[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
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
              <TableCell className='font-medium'>{d.id}</TableCell>
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
                <UpdateStudentDialog id={d.id} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ITStudentsTable
