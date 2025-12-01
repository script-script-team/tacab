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
import { Link } from 'react-router-dom'

const ITStudentTable = ({ students }: { students: IFullStudentProp[] }) => {
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
          <TableHead>Paid</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Password</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((d) => (
          <TableRow key={d.id}>
            <TableCell>
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
            <TableCell>${d.totalPayment}</TableCell>
            <TableCell>{d.subject}</TableCell>

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
        ))}
      </TableBody>
    </Table>
  )
}

export default ITStudentTable
