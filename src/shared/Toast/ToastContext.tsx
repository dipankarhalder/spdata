/** node modules */
import { createContext } from 'react'

/** state type */
export interface ToastMessage {
  type: 'success' | 'error' | 'info' | 'warning' | string
  title: string
  description: string
}

/** props type */
export interface ToastContextType {
  showToast: (message: ToastMessage, duration?: number) => void
  hideToast: () => void
}

/** context */
export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
)
