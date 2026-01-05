/** node modules */
import React, { useState, useCallback } from 'react'

/** types */
import type { ReactNode } from 'react'
import type { ToastContextType } from './ToastContext'

/** context */
import { ToastContext } from './ToastContext'
import { Toast } from './index'

/** toast message type */
interface ToastMessage {
  type: 'success' | 'error' | 'info' | 'warning' | string
  title: string
  description: string
}

/** state type */
interface ToastState {
  show: boolean
  type: string
  heading: string
  description: string
}

/** provider props */
interface ToastProviderProps {
  children: ReactNode
}

/** toast provider */
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastState, setToastState] = useState<ToastState>({
    show: false,
    type: '',
    heading: '',
    description: '',
  })

  const addToast = useCallback((message: ToastMessage, duration = 5000) => {
    if (!message.type) return

    setToastState({
      show: true,
      type: message.type,
      heading: message.title,
      description: message.description,
    })

    setTimeout(() => {
      setToastState(prev => ({ ...prev, show: false }))
    }, duration)
  }, [])

  const removeToast = useCallback(() => {
    setToastState(prev => ({ ...prev, show: false }))
  }, [])

  const contextValue: ToastContextType = {
    showToast: addToast,
    hideToast: removeToast,
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toastState.show && (
        <Toast
          show={toastState.show}
          removeToast={removeToast}
          toastData={toastState}
        />
      )}
    </ToastContext.Provider>
  )
}
