/** icons */
import {
  User,
  Dashboard,
  Deals,
  Phone,
  Tasks,
  Teams,
  Notify,
  Assets,
  Members,
  Configr,
  Clients,
  Vendors,
  Reports,
  Products,
  Invoice,
  Tracking,
  Settings,
  Rreturn,
  Companies,
  Resource,
  Billings,
  Anasysis,
  Activity,
  Schedules,
  Subscription,
} from '@/icons'

/** stores */
import { useAuthStore } from '@/store/authStore'

/** config */
import { paths } from '@/config/paths'

export const groups = [
  { id: '1', label: 'codename.com' },
  { id: '2', label: 'projectpath.com' },
]

export const getMainMenus = () => {
  /** hooks */
  const { isUsername } = useAuthStore()

  return [
    {
      id: 1,
      label: 'Main Menu',
      children: [
        {
          id: 1,
          icon: <Dashboard />,
          label: 'Dashboard',
          path: `/${isUsername}`,
        },
        { id: 2, icon: <Anasysis />, label: 'Analytics', path: '/' },
      ],
    },
    {
      id: 2,
      label: 'Projects',
      children: [
        { id: 1, icon: <Tasks />, label: 'Tasks', path: '/', count: 24 },
        { id: 3, icon: <Assets />, label: 'Assets', path: '/', count: 3 },
        {
          id: 4,
          icon: <Reports />,
          label: 'Reports',
          path: `/${isUsername}/${paths.reports}`,
        },
        { id: 5, icon: <Schedules />, label: 'Schedules', path: '/' },
        { id: 2, icon: <Teams />, label: 'Teams', path: '/', count: 7 },
        { id: 6, icon: <Clients />, label: 'Clients', path: '/', count: 10 },
        { id: 7, icon: <Invoice />, label: 'Invoices', path: '/' },
      ],
    },
    {
      id: 3,
      label: 'Products',
      children: [
        { id: 1, icon: <Products />, label: 'Products', path: '/' },
        { id: 2, icon: <Tracking />, label: 'Trackings', path: '/' },
        { id: 3, icon: <Rreturn />, label: 'Returns', path: '/', count: 12 },
        { id: 4, icon: <Billings />, label: 'Billings', path: '/' },
        {
          id: 5,
          icon: <Vendors />,
          label: 'Vendors',
          path: `/${isUsername}/${paths.vendors}`,
        },
      ],
    },
    {
      id: 4,
      label: 'Resources Management',
      children: [
        {
          id: 1,
          icon: <Resource />,
          label: 'Onboard',
          path: `/${isUsername}/${paths.onboard}`,
        },
        {
          id: 2,
          icon: <Members />,
          label: 'Members',
          path: `/${isUsername}/${paths.members}`,
          count: 6,
        },
        {
          id: 3,
          icon: <Assets />,
          label: 'Salaries',
          path: `/${isUsername}/${paths.salaries}`,
        },
        {
          id: 5,
          icon: <Schedules />,
          label: 'Attendances',
          path: `/${isUsername}/${paths.attendances}`,
        },
        { id: 4, icon: <Reports />, label: 'Reports', path: '/' },
      ],
    },
    {
      id: 5,
      label: 'Manage Customers',
      children: [
        { id: 1, icon: <Phone />, label: 'Contact', path: '/' },
        { id: 2, icon: <Companies />, label: 'Companies', path: '/' },
        { id: 3, icon: <Deals />, label: 'Deals', path: '/' },
        { id: 4, icon: <Activity />, label: 'Activities', path: '/' },
      ],
    },
    {
      id: 6,
      label: 'System Options',
      children: [
        { id: 1, icon: <Notify />, label: 'Notification', path: '/' },
        { id: 2, icon: <Configr />, label: 'Preferences', path: '/' },
        { id: 3, icon: <Settings />, label: 'Settings', path: '/' },
        {
          id: 4,
          icon: <Subscription />,
          label: 'Subscription',
          path: '/',
        },
        { id: 5, icon: <User />, label: 'Profile', path: '/' },
      ],
    },
  ]
}
