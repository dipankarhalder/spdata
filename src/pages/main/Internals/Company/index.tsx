/** node modules */
import { Outlet } from 'react-router-dom'

/** icons */
import { Dashboard, Companies } from '@/icons'

/** components */
import { paths } from '@/config/paths'
import { Breadcrumb } from '@/shared/Breadcrumb'
import { useAuthStore } from '@/store/authStore'

export const CompanyPage = () => {
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
              label: 'All Companies Information',
              icon: <Companies />,
              to: `/${isUsername}/${paths.company}`,
            },
          ]}
        />
      </div>
      <div className="app_main_content_wrapping">
        <h1>Manage Company Informations</h1>
        <Outlet />
      </div>
    </div>
  )
}
