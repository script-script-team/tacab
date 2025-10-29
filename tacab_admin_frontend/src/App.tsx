import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/ui/theme-provider'
import { router } from './router'
import { useDispatch } from 'react-redux'
import { useWhoAmI } from './react-query/login.hook'
import { login } from './pages/redux/auth/login.slice'
import { useEffect } from 'react'
import { setLoading } from './pages/redux/loading.slice'

function App() {
  const dispatch = useDispatch()
  const { data, isLoading } = useWhoAmI()

  useEffect(() => {
    if (data) {
      dispatch(login(data.admin))
    }
  }, [data, dispatch])

  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [isLoading])

  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
