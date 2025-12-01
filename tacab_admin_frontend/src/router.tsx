import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/auth/login'
import NotFound from './pages/NotFound'
import DashIntro from './pages/Dashboard/DashIntro'
import Uploads from './pages/Dashboard/Uploads'
import Results from './pages/Dashboard/Results'
import Students from './pages/Dashboard/Students'
import AdminSettings from './pages/Dashboard/Admins'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Settings } from './pages/Dashboard/Settings'
import Payment from './pages/Dashboard/Payment'
import ManageStudents from './pages/Dashboard/ManageStudents'
import StudentDetail from './pages/Dashboard/StudentDetail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <DashIntro />,
          },
          {
            path: 'uploads',
            element: <Uploads />,
          },
          {
            path: 'results',
            element: <Results />,
          },
          {
            path: 'manage-students',
            children: [
              {
                index: true,
                element: <ManageStudents />,
              },
              {
                path: ':id',
                element: <StudentDetail />,
              },
            ],
          },
          {
            path: 'students',
            element: <Students />,
          },
          {
            path: 'admins',
            element: <AdminSettings />,
          },
          {
            path: 'payment',
            element: <Payment />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },
      {
        path: '/auth',
        children: [
          {
            path: 'login',
            element: <Login />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
