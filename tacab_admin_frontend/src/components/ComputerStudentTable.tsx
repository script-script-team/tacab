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
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const ComputerStudentTable = ({
  students,
}: {
  students: IFullStudentProp[]
}) => {
  const [visiblePasswords, setVisiblePasswords] = useState<
    Record<number, boolean>
  >({})
  const togglePassword = (id: number) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

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
          <TableHead>Password</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((d, i) => {
          return (
            <TableRow key={i}>
              <TableCell className='font-medium'>{d.student_code}</TableCell>
              <TableCell>{d.name}</TableCell>
              <TableCell>{d.phone_number}</TableCell>
              <TableCell>{d.subject}</TableCell>
              <TableCell>{d.marks.windows}</TableCell>
              <TableCell>{d.marks.word}</TableCell>
              <TableCell>{d.marks.excel}</TableCell>
              <TableCell>{d.marks.power_point}</TableCell>
              <TableCell>{d.marks.access}</TableCell>
              <TableCell>{d.marks.publisher}</TableCell>
              <TableCell>{d.marks.outlook}</TableCell>
              <TableCell>{d.marks.computer_literacy}</TableCell>
              <TableCell>{d.marks.average}</TableCell>
              <TableCell>{d.marks.grade}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <span>{visiblePasswords[d.id] ? d.password : '••••••'}</span>

                  <button
                    type='button'
                    onClick={() => togglePassword(d.id)}
                    className='text-gray-600 hover:text-black'
                  >
                    {visiblePasswords[d.id] ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </TableCell>
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
