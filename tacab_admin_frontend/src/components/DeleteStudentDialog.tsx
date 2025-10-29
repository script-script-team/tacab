import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { MdDelete } from 'react-icons/md'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useDeleteStudent } from '@/react-query/student.hooks'

const DeleteStudentDialog = ({ id }: { id: number }) => {
  const { mutate: deleteStudent, isPending } = useDeleteStudent()
  const queryClient = useQueryClient()

  const handleDeleting = () => {
    deleteStudent(id, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ['it-students'] })
        queryClient.invalidateQueries({ queryKey: ['computer-students'] })
        toast.success(res.message || 'Deleted student ')
      },
      onError: (err) => {
        toast.error(err.message || 'Failed to delete student')
      },
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MdDelete className='cursor-pointer text-red-500' />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={'destructive'}
              onClick={handleDeleting}
              disabled={isPending}
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteStudentDialog
