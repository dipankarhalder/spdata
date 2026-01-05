/** node modules */
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '@tanstack/react-form'

/** configs */
import { paths } from '@/config/paths'

/** shared components */
import { ToastContext } from '@/shared/Toast/ToastContext'

/** utils functions */
import { FieldInfo } from '@/utils/fieldValidator'

/** stores */
import { useAuthStore } from '@/store/authStore'

/** default value */
const defaultUsername: {
  username: string
} = {
  username: '',
}

export const VerifiedEmailPage = () => {
  /** hooks */
  const navigate = useNavigate()
  const toast = useContext(ToastContext)
  const { setUsername } = useAuthStore()

  /** check toast component loaded or not */
  if (!toast) {
    throw new Error('SigninPage must be used within a ToastProvider')
  }
  const { showToast } = toast

  /** form method */
  const form = useForm({
    defaultValues: defaultUsername,
    onSubmit: async ({ value }) => {
      setUsername(value.username)
      showToast({
        type: 'success',
        title: 'Successfully added username',
        description: JSON.stringify(value),
      })
      navigate(paths.selCountry)
    },
  })

  return (
    <div className="app_auth_inside_cover">
      <h1>Choose a username</h1>
      <p>Let's finish setting up your account</p>
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
              name="username"
              validators={{
                onSubmit: ({ value }) => {
                  return !value ? 'Please enter a username' : null
                },
              }}
              children={field => {
                return (
                  <>
                    <label htmlFor={field.name}>Username:</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                    <p>
                      Username may only contain alphanumeric characters or
                      single hyphens, and cannot begin or end with a hyphen.
                    </p>
                    <div className="app_sugg_username_list">
                      <p>Suggested username</p>
                      <ul>
                        <li>dipankar-234</li>
                        <li>deepankar-h24</li>
                        <li>dip-23436</li>
                      </ul>
                    </div>
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
                  {isSubmitting ? '...' : 'Continue'}
                </button>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
