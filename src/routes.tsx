import { Navigate, type RouteObject } from 'react-router'
import App from '@/App'
import { Home } from '@/pages/home'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      // Unknown URLs fall back to the home page
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]
