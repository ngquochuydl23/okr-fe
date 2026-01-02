import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'
import type { UserRole } from '@/store/authSlice'

interface RoleBasedRouteProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
}

export function RoleBasedRoute({ children, allowedRoles }: RoleBasedRouteProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const hasRequiredRole = user?.roles.some((role) => allowedRoles.includes(role))

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}
