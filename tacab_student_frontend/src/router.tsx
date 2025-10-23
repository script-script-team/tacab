import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import Login from './pages/auth/login'
import NotFound from './pages/NotFound'
import Services from './pages/Services'
import Help from './pages/Help'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        index: true,
        element: <Result />,
      },
      {
        path: '/services',
        element: <Services />,
      },
      {
        path: '/help',
        element: <Help />,
      },
    ],
  },
  {
    path: '/result',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
