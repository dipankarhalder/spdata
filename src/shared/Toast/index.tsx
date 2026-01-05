/** node modules */
import React from 'react'

/** icons */
import { Cross } from '@/icons'

/** state type */
export interface ToastData {
  type: 'success' | 'error' | 'info' | 'warning' | string
  heading: string
  description?: string
  show?: boolean
}

/** props type */
interface ToastProps {
  show: boolean
  removeToast: () => void
  toastData: ToastData
}

export const Toast: React.FC<ToastProps> = ({
  show,
  removeToast,
  toastData,
}) => {
  const { type, heading, description } = toastData

  return (
    <div className={`app_toast ${show ? 'show' : 'hide'}`}>
      <div className={`app_toast_cover ${type && type}`}>
        <div className="app_toast_content">
          <h5>{heading}</h5>
          {description && <p>{description}</p>}
        </div>
        <button onClick={() => removeToast()}>
          <Cross />
        </button>
      </div>
    </div>
  )
}
