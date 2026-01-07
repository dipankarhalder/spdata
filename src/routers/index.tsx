import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { paths } from '@/config/paths'
import { AuthLayout } from '@/layouts/AuthLayout'
import { AdminLayout } from '@/layouts/AdminLayout'

import { ErrorPage } from '@/pages/error/ErrorPage'
import { SigninPage } from '@/pages/auth/SigninPage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { VerifiedEmailPage } from '@/pages/auth/VerifiedEmailPage'
import { CountrySelection } from '@/pages/auth/CountrySelection'
import { ForgotPage } from '@/pages/auth/ForgotPage'

import { DashboardPage } from '@/pages/main/DashboardPage'
import { ReportsPage } from '@/pages/main/ReportsPage'

// Internals
import { CompanyPage } from '@/pages/main/Internals/Company'
import { CompanyListPage } from '@/pages/main/Internals/Company/ListPage'

// Resources
import { OnboardProcessPage } from '@/pages/main/Resources/OnboardProcess'
import { MembersPage } from '@/pages/main/Resources/Members'
import { MembersListPage } from '@/pages/main/Resources/Members/ListPage'
import { SalaryPage } from '@/pages/main/Resources/Salaries'
import { SalaryListPage } from '@/pages/main/Resources/Salaries/ListPage'
import { AttendancePage } from '@/pages/main/Resources/Attendance'
import { AttendanceListPage } from '@/pages/main/Resources/Attendance/ListPage'

// Products
import { VendorsPage } from '@/pages/main/Erp/Vendors'
import { VendorListPage } from '@/pages/main/Erp/Vendors/ListPage'

/** routes path */
const routes = createBrowserRouter([
  {
    path: paths.login,
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <SigninPage /> },
      { path: paths.register, element: <SignupPage /> },
      { path: paths.finduser, element: <VerifiedEmailPage /> },
      { path: paths.selCountry, element: <CountrySelection /> },
      { path: paths.forgot, element: <ForgotPage /> },
    ],
  },
  {
    path: paths.admin,
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: paths.reports, element: <ReportsPage /> },
      {
        path: paths.company,
        element: <CompanyPage />,
        children: [{ index: true, element: <CompanyListPage /> }],
      },
      {
        path: paths.onboard,
        element: <OnboardProcessPage />,
      },
      {
        path: paths.members,
        element: <MembersPage />,
        children: [{ index: true, element: <MembersListPage /> }],
      },
      {
        path: paths.salaries,
        element: <SalaryPage />,
        children: [{ index: true, element: <SalaryListPage /> }],
      },
      {
        path: paths.attendances,
        element: <AttendancePage />,
        children: [{ index: true, element: <AttendanceListPage /> }],
      },
      {
        path: paths.vendors,
        element: <VendorsPage />,
        children: [{ index: true, element: <VendorListPage /> }],
      },
    ],
  },
])

export const AppRouters = () => {
  return <RouterProvider router={routes} />
}
