import { AlertDialog } from '@radix-ui/react-alert-dialog'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

export default function InternetWatcher() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      toast.success('Back online ✅')
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast.error('No internet connection ❌')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return !isOnline ? (
    <AlertDialog open={true} onOpenChange={() => {}}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>⚠️ No internet connection</AlertDialogTitle>
          <AlertDialogDescription>
            You are offline. Please check your connection to continue using the
            app.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : null
}
