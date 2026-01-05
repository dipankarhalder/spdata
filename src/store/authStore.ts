/** node modules */
import { create } from 'zustand'

/** types */
interface AuthState {
  /** authenticated */
  isAuthenticated: string | null
  setUserAuthentication: (token: string) => void
  userLogout: () => void

  /** username */
  isUsername: string | null
  setUsername: (username: string) => void
  removeUsername: () => void

  /** user email */
  isUserEmail: string | null
  setUserEmail: (email: string) => void
  removeUserEmail: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  /** authenticated */
  isAuthenticated: localStorage.getItem('authToken') || null,
  setUserAuthentication: token => {
    if (token) localStorage.setItem('authToken', token)
    set({ isAuthenticated: token })
  },
  userLogout: () => {
    localStorage.clear()
    set({ isAuthenticated: null, isUsername: null, isUserEmail: null })
  },

  /** username */
  isUsername: localStorage.getItem('authUser') || null,
  setUsername: username => {
    localStorage.setItem('authUser', username)
    set({ isUsername: username })
  },
  removeUsername: () => {
    localStorage.removeItem('authUser')
    set({ isUsername: null })
  },

  /** user email */
  isUserEmail: localStorage.getItem('authEmail') || null,
  setUserEmail: email => {
    localStorage.setItem('authEmail', email)
    set({ isUserEmail: email })
  },
  removeUserEmail: () => {
    localStorage.removeItem('authEmail')
    set({ isUserEmail: null })
  },
}))
