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

const ComputerStudentTable = ({
  students,
}: {
  students: IFullStudentProp[]
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Book 1</TableHead>
          <TableHead>Book 2</TableHead>
          <TableHead>Book 3</TableHead>
          <TableHead>Average</TableHead>
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
              <TableCell>{d.marks.book_1}</TableCell>
              <TableCell>{d.marks.book_2}</TableCell>
              <TableCell>{d.marks.book_3}</TableCell>
              <TableCell>{d.marks.average}</TableCell>
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

export default ComputerStudentTable
