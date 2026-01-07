/** node modules */
import { Outlet } from 'react-router-dom'

/** icons */
import { Dashboard, Vendors } from '@/icons'

/** components */
import { paths } from '@/config/paths'
import { Breadcrumb } from '@/shared/Breadcrumb'
import { useAuthStore } from '@/store/authStore'

export const VendorsPage = () => {
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
              label: 'Vendor Informations',
              icon: <Vendors />,
              to: `/${isUsername}/${paths.vendors}`,
            },
          ]}
        />
      </div>
      <Outlet />
    </div>
  )
}
