import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import Login from './pages/auth/login'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/result',
        element: <Result />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
