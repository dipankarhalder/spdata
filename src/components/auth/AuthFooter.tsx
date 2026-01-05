/** node modules */
import { Link } from 'react-router-dom'

/** icons */
import { Alink } from '@/icons'

export const AuthFooter = () => {
  return (
    <div className="app_policy_info">
      <p>
        Login one time for access&nbsp;
        <span className="app_notify app_pms">PMS,</span>&nbsp;
        <span className="app_notify app_crm">CRM,</span>
        &nbsp;<span className="app_notify app_erp">ERP</span>&nbsp;and&nbsp;
        <Link to="/">
          more <Alink />
        </Link>
      </p>
      <ul>
        <li>
          <Link to="/">
            Privacy Policy <Alink />
          </Link>
        </li>
        <li>
          <Link to="/">
            Terms of Services <Alink />
          </Link>
        </li>
      </ul>
      <p>This site is protected by reCAPTCHA</p>
    </div>
  )
}
