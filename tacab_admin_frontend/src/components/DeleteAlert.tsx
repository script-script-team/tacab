import { Button } from '@/components/ui/button'
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
import { Trash } from 'lucide-react'
import { useDeleteAdmin } from '@/react-query/admin.hooks'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function DeleteAlert({
  iconSize,
  id,
}: {
  iconSize: number
  id: number
}) {
  const { mutate: deleteAdmin, isPending } = useDeleteAdmin()
  const queryClient = useQueryClient()
  const handleDelete = () => {
    deleteAdmin(id, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ['all-admins'] })
        toast.success(res.message || 'Deleted admin successfully')
      },
      onError: (err) => {
        toast.error(err.message || 'Failed to delete admin')
      },
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash size={iconSize} />
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
              onClick={handleDelete}
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
