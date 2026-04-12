import { Navigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import Cookies from 'js-cookie';
import CommonConstanst from '@/constants/common.constans';
import { UserService } from '@/services/user';
import { loginSuccess, setLoading } from '@/store/slices/authSlice';
import { useEffect, useMemo } from 'react';
import LoadingScreen from './LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading } = useAppSelector((state) => state.auth);
  const location = useLocation()
  const dispatch = useAppDispatch();

  const accessToken = useMemo(() => Cookies.get(CommonConstanst.AccessTokenKey), [Cookies]);

  const silentlyAuthenticate = async () => {
    dispatch(setLoading(true));
    if (!accessToken) {
      dispatch(setLoading(false));
      return;
    }

    try {
      const user = await UserService.getUserInfo();
      dispatch(loginSuccess(user));
    } catch (error) {
      console.error("Silent authentication failed:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    silentlyAuthenticate();
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (isLoading && accessToken) {
    return <LoadingScreen />
  }

  return <>{children}</>
}
