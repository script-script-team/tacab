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
import { useDeleteUpload } from '@/react-query/uploads.hooks'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

const DeleteUploadDialog = ({ id }: { id: string }) => {
  const { mutate: deleteUpload, isPending } = useDeleteUpload()
  const queryClient = useQueryClient()

  const handleDeleting = () => {
    deleteUpload(id, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ['all-uploads'] })
        toast.success(res.message || 'Delete ')
      },
      onError: (err) => {
        toast.error(err.message)
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

export default DeleteUploadDialog
