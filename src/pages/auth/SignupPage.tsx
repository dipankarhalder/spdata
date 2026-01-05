/** node modules */
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '@tanstack/react-form'

/** configs */
import { verify } from '@/config/image'
import { paths } from '@/config/paths'

/** icons */
import { CircleTick } from '@/icons'

/** shared components */
import { ToastContext } from '@/shared/Toast/ToastContext'

/** utils functions */
import { FieldInfo } from '@/utils/fieldValidator'

/** stores */
import { useAuthStore } from '@/store/authStore'

/** default value */
const defaultRegisterUser: {
  firstName: string
  lastName: string
  password: string
} = {
  firstName: '',
  lastName: '',
  password: '',
}

export const SignupPage = () => {
  /** hooks */
  const navigate = useNavigate()
  const toast = useContext(ToastContext)
  const { isUserEmail } = useAuthStore()

  /** check toast component loaded or not */
  if (!toast) {
    throw new Error('SigninPage must be used within a ToastProvider')
  }
  const { showToast } = toast

  /** form method */
  const form = useForm({
    defaultValues: defaultRegisterUser,
    onSubmit: async ({ value }) => {
      showToast({
        type: 'success',
        title: 'Successfully registered',
        description: JSON.stringify(value),
      })
      navigate(paths.finduser)
    },
  })

  return (
    <div className="app_auth_inside_cover">
      <h1>Create an account</h1>
      <p>Please create an account to continue access the application</p>
      <div className="app_auth_form">
        <form
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <div className="app_auth_input_extra">
            <em>Verified Email:</em>
            {isUserEmail && (
              <p>
                {isUserEmail}
                <img src={verify} alt={isUserEmail} />
                <span>(Not Verified)</span>
              </p>
            )}
          </div>
          <div className="app_form_input_row">
            <div className="app_form_input">
              <form.Field
                name="firstName"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Please enter a first name' : null,
                }}
                children={field => {
                  return (
                    <>
                      <label htmlFor={field.name}>First Name:</label>
                      <input
                        type="text"
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
            <div className="app_form_input">
              <form.Field
                name="lastName"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Please enter a last name' : null,
                }}
                children={field => {
                  return (
                    <>
                      <label htmlFor={field.name}>Last Name:</label>
                      <input
                        type="text"
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
          </div>
          <div className="app_form_input">
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  const errors = []
                  if (value.length < 8)
                    errors.push('Minimum 8 characters required')
                  if (!/[A-Z]/.test(value))
                    errors.push('At least 1 uppercase letter required')
                  if (!/[a-z]/.test(value))
                    errors.push('At least 1 lowercase letter required')
                  if (!/[0-9]/.test(value))
                    errors.push('At least 1 number required')
                  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
                    errors.push('At least 1 special character required')
                  return errors.length ? errors.join(', ') : null
                },
              }}
              children={field => {
                const password = field.state.value
                const rules = [
                  {
                    label: 'Minimum 8 characters',
                    valid: password.length >= 8,
                  },
                  {
                    label: 'At least 1 uppercase letter',
                    valid: /[A-Z]/.test(password),
                  },
                  {
                    label: 'At least 1 lowercase letter',
                    valid: /[a-z]/.test(password),
                  },
                  { label: 'At least 1 number', valid: /[0-9]/.test(password) },
                  {
                    label: 'At least 1 special character',
                    valid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
                  },
                ]
                return (
                  <>
                    <label htmlFor={field.name}>Password:</label>
                    <input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={password}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      autoComplete="password"
                    />
                    <div className="app_password_validation">
                      {rules.map((rule, i) => (
                        <p key={i} className={rule.valid ? 'valid' : 'invalid'}>
                          <CircleTick
                            color={rule.valid ? '#3a922d' : '#e4e4e4'}
                          />
                          {rule.label}
                        </p>
                      ))}
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
                  {isSubmitting ? '...' : 'Create account'}
                </button>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
