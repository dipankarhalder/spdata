/** node modules */
import { Outlet, Navigate } from 'react-router-dom' // useNavigate

/** configs */
import { paths } from '@/config/paths'
// import { CircleTick, Cross } from '@/icons'

/** stores */
import { useAuthStore } from '@/store/authStore'

/** components */
import { Sidebar } from '@/components/main/Sidebar'
// import erp from '/erp.png'
// import hr from '/hr.png'
// import cms from '/cms.png'
// import inventory from '/inventory.png'
import { useEffect } from 'react' // useState

export const AdminLayout = () => {
  // const navigate = useNavigate()
  // const [isOpen, setIsOpen] = useState(true)
  // const [appTypes] = useState(localStorage.getItem('apptype'))

  /** hooks */
  const { isAuthenticated, isUsername } = useAuthStore()

  /** check the token and username available or not */
  if (!isAuthenticated || !isUsername) {
    return <Navigate to={paths.login} replace />
  }

  useEffect(() => {
    localStorage.setItem('apptype', 'hr')
  }, [])

  // const handleClosePop = (value: string) => {
  //   if (value === 'hr') {
  //     navigate(`/${isUsername}/${paths.onboard}`)
  //   }
  //   setIsOpen(false)
  // }

  return (
    <div className="app_admin_wrapper">
      <Sidebar />
      <div className="app_admin_cover_wrapper">
        <Outlet />
      </div>
      <div className="app_right_side_bar">sfkjhkjsf</div>
      {/* {isOpen && (
        <div className="app_main_popup">
          <span onClick={() => setIsOpen(false)}>
            <Cross />
          </span>
          <div className="app_pop_inside">
            <h3>What we offer</h3>
            <p>Browse our services and find the perfect solution for you.</p>
            <div className="app_pop_select_section">
              <ul>
                <li>
                  <img src={erp} alt="erp" />
                  <h5>
                    ERP System <span>(Enterprise Resource Planning)</span>
                  </h5>
                </li>
                <li>
                  <img src={cms} alt="cms" />
                  <h5>
                    CMS System <span>(Content Management System)</span>
                  </h5>
                </li>
                <li
                  className={appTypes === 'hr' ? 'activeType' : ''}
                  onClick={() => handleClosePop('hr')}
                >
                  {appTypes === 'hr' && (
                    <span>
                      <CircleTick />
                    </span>
                  )}
                  <img src={hr} alt="ffr" />
                  <h5>
                    HR System <span>(Human Resources Management)</span>
                  </h5>
                </li>
                <li>
                  <img src={inventory} alt="inventory" />
                  <h5>
                    Inventory System <span>(Inventory Management System)</span>
                  </h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}
