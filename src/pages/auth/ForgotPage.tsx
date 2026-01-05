/** node modules */
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '@tanstack/react-form'

/** config */
import { paths } from '@/config/paths'

/** type */
import type { AnyFieldApi } from '@tanstack/react-form'

/** components */
import { ToastContext } from '@/shared/Toast/ToastContext'

/** fields error */
const FieldInfo = ({ field }: { field: AnyFieldApi }) => {
  const { isTouched, isValid, isValidating, errors } = field.state.meta
  return (
    <>
      {isTouched && !isValid && <em>{errors.join(', ')}</em>}
      {isValidating && 'Validating...'}
    </>
  )
}

/** user default info */
const defaultLoginUser: {
  email: string
} = {
  email: '',
}

export const ForgotPage = () => {
  const toast = useContext(ToastContext)
  if (!toast) {
    throw new Error('SigninPage must be used within a ToastProvider')
  }
  const { showToast } = toast

  const form = useForm({
    defaultValues: defaultLoginUser,
    onSubmit: async ({ value }) => {
      console.log(value)
      showToast({
        type: 'success',
        title: 'Success',
        description: 'You have successfully signed in!',
      })
    },
  })

  return (
    <div className="app_auth_inside_cover">
      <h1>Reset your password</h1>
      <p>
        Enter your user account's verified email address and we will send you a
        password reset link.
      </p>
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
                  return !value ? 'Please enter a valid email address' : null
                },
              }}
              children={field => {
                return (
                  <>
                    <label htmlFor={field.name}>Email:</label>
                    <input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </>
                )
              }}
            />
          </div>
          <div className="app_form_btn">
            <form.Subscribe
              selector={state => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? '...' : 'Send password rest email'}
                </button>
              )}
            />
          </div>
          <div className="app_register_link">
            <p>
              Back to <Link to={paths.login}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
