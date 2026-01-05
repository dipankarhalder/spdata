/** node modules */
import { Outlet, Navigate } from 'react-router-dom'

/** components */
import { Logo } from '@/components/main/Logo'

/** stores */
import { useAuthStore } from '@/store/authStore'

export const AuthLayout = () => {
  /** hooks */
  const { isAuthenticated, isUsername } = useAuthStore()

  /** check the token available or not */
  if (isAuthenticated) {
    return <Navigate to={`/${isUsername}`} replace />
  }

  return (
    <div className="app_auth_wrapper">
      <div className="app_auth_wrapper_sidebar">
        <div className="app_auth_form_cover">
          <div className="app_auth_form_inside">
            <div className="app_auth_logo">
              <Logo />
            </div>
            <Outlet />
          </div>
        </div>
        <div className="app_background_content"></div>
      </div>
      <div className="app_log_auth_bg"></div>
    </div>
  )
}
