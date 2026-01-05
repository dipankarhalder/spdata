/** node modules */
import { Outlet } from 'react-router-dom'

/** icons */
import { Dashboard, Resource } from '@/icons'

/** components */
import { paths } from '@/config/paths'
import { Breadcrumb } from '@/shared/Breadcrumb'
import { useAuthStore } from '@/store/authStore'

export const AttendancePage = () => {
  const { isUsername } = useAuthStore()

  return (
    <div className="app_page_inside_cover">
      <div className="app_inside_top_area">
        <Breadcrumb
          items={[
            {
              label: 'Dashboard',
              icon: <Dashboard />,
              to: `/${isUsername}`,
            },
            {
              label: 'Members Attendance Informations',
              icon: <Resource />,
              to: `/${isUsername}/${paths.vendors}`,
            },
          ]}
        />
      </div>
      <Outlet />
    </div>
  )
}
