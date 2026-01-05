/** node modules */
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

/** types */
import type { BreadcrumbProps } from './types'

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="app_top_page_cover">
      <div className="app_top_page_information">
        <div className="app_top_breadcumb">
          {items.map((item, index) => (
            <Fragment key={index}>
              <Link to={item.to}>
                {item.icon}
                {item.label}
              </Link>
              {index < items.length - 1 && <span>/</span>}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
