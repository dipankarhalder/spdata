import { Link } from 'react-router-dom'
import { Edit, Delete, Call, Website, Email } from '@/icons'
import companyData from '@/data/company.json'

export const CompanyListPage = () => {
  return (
    <div className="app_data_table_cover">
      <div className="app_data_table_inside">
        <div className="app_data_card_main_cover">
          {companyData.companies.map(item => (
            <div key={item.id} className="app_card_each_item">
              <div className="app_card_upper_section">
                <span></span>
                <div className="app_card_upper_inside">
                  <h3>{item.name}</h3>
                  <h6>
                    <Call />
                    {item.contact_number}
                  </h6>
                  <h6>
                    <Email />
                    {item.email}
                  </h6>
                </div>
              </div>
              <div className="app_card_middle_section">
                <p className="app_web_link">
                  <Website />
                  <Link to={item.website} target="blank">
                    {item.website}
                  </Link>
                </p>
                <p className="app_address">
                  {item.address.street}, {item.address.city}
                </p>
                <p className="app_address">
                  {item.address.state}, {item.address.postal_code}
                </p>
              </div>
              <div className="app_card_row_btns">
                <button
                  className="app_table_edit_btn"
                  onClick={() => console.log(item.id)}
                >
                  <Edit /> Edit
                </button>
                <button
                  className="app_table_delete_btn"
                  onClick={() => console.log(item.id)}
                >
                  <Delete /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
