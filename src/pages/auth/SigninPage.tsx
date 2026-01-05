/** node modules */
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '@tanstack/react-form'

/** configs */
import { paths } from '@/config/paths'

/** components */
import { AuthFooter } from '@/components/auth/AuthFooter'
import { SocialAuth } from '@/components/auth/SocialAuth'

/** shared components */
import { ToastContext } from '@/shared/Toast/ToastContext'

/** utils functions */
import { FieldInfo } from '@/utils/fieldValidator'

/** stores */
import { useAuthStore } from '@/store/authStore'

/** default value */
const defaultLoginUser: {
  email: string
  password: string
} = {
  email: '',
  password: '',
}

export const SigninPage = () => {
  /** states */
  const [isVerified, setIsVerified] = useState(false)

  /** hooks */
  const navigate = useNavigate()
  const toast = useContext(ToastContext)
  const { setUserAuthentication, setUserEmail, removeUserEmail, setUsername } =
    useAuthStore()

  /** check toast component loaded or not */
  if (!toast) {
    throw new Error('SigninPage must be used within a ToastProvider')
  }
  const { showToast } = toast

  /** form method */
  const form = useForm({
    defaultValues: defaultLoginUser,
    onSubmit: async ({ value }) => {
      const { email, password } = value

      /** verify the user email exist or not */
      if (!isVerified) {
        if (email === 'dipankar@gmail.com') {
          removeUserEmail()
          setIsVerified(true)
          return
        } else {
          setUserEmail(email)
          navigate(paths.register)
          return
        }
      }

      /** if the email exist, user can continue with password field for login */
      if (isVerified) {
        if (!password) {
          showToast({
            type: 'error',
            title: 'Password Required',
            description: 'Please enter your password.',
          })
          return
        }

        removeUserEmail()
        setUsername('dipankar')
        setUserAuthentication('authenticated')
        showToast({
          type: 'success',
          title: 'Successfully signed-in',
          description: JSON.stringify(value),
        })
        navigate(paths.admin)
      }
    },
  })

  return (
    <div className="app_auth_inside_cover">
      <p>Please sign in to continue your session</p>
      <div className="app_auth_form">
        <form
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <div className="app_form_input">
            <form.Field
              name="email"
              validators={{
                onSubmit: ({ value }) => {
                  return !value ? 'Please enter your email address' : null
                },
              }}
              children={field => {
                return (
                  <>
                    <label htmlFor={field.name}>
                      Email <span>*</span>
                    </label>
                    <input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      autoComplete="email"
                      disabled={isVerified}
                    />
                    <FieldInfo field={field} />
                    <p>
                      You may use either your personal or official email address
                      to sign in or register a new uesr.
                    </p>
                  </>
                )
              }}
            />
          </div>
          {isVerified && (
            <div className="app_form_input">
              <form.Field
                name="password"
                validators={{
                  onSubmit: ({ value }) => {
                    return !value ? 'Please enter a valid password' : null
                  },
                }}
                children={field => (
                  <>
                    <label htmlFor={field.name}>
                      Password <span>*</span>
                    </label>
                    <input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      autoComplete="current-password"
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
          )}
          <div className="app_forgot_link">
            <Link to={paths.forgot}>Forgot password?</Link>
          </div>
          <div className="app_form_btn">
            <form.Subscribe
              selector={state => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button type="submit" disabled={!canSubmit}>
                  {isSubmitting
                    ? '...'
                    : isVerified
                      ? 'Login to access'
                      : 'Continue'}
                </button>
              )}
            />
          </div>
          <SocialAuth />
        </form>
        <AuthFooter />
      </div>
    </div>
  )
}
