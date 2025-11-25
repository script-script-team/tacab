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

const ITStudentsTable = ({ students }: { students: IFullStudentProp[] }) => {
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
    <NotFoundMessage message='No IT students found!' />
  ) : (
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
              <TableCell>{d.marks.a_plus}</TableCell>
              <TableCell>{d.marks.multimedia}</TableCell>
              <TableCell>{d.marks.web_desing}</TableCell>
              <TableCell>{d.marks.networking}</TableCell>
              <TableCell>{d.marks.database}</TableCell>
              <TableCell>{d.marks.programming}</TableCell>
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

export default ITStudentsTable
