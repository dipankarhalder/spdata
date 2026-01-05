/** node modules */
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '@tanstack/react-form'

/** configs */
import { paths } from '@/config/paths'

/** shared components */
import { ToastContext } from '@/shared/Toast/ToastContext'
import { Dropdown } from '@/shared/Dropdown'

/** stores */
import { useAuthStore } from '@/store/authStore'

/** user default info */
const defaultCountry: {
  reagion: string
} = {
  reagion: 'India',
}

export const CountrySelection = () => {
  /** country list */
  const groups = [
    { id: '1', label: 'India' },
    { id: '2', label: 'Australia' },
    { id: '3', label: 'USA' },
    { id: '4', label: 'UK' },
    { id: '5', label: 'Japan' },
    { id: '6', label: 'Russia' },
  ]

  /** states */
  const [selectedId, setSelectedId] = useState<string | undefined>()

  /** hooks */
  const navigate = useNavigate()
  const toast = useContext(ToastContext)
  const { isUsername, removeUserEmail, setUserAuthentication } = useAuthStore()

  /** check toast component loaded or not */
  if (!toast) {
    throw new Error('SigninPage must be used within a ToastProvider')
  }
  const { showToast } = toast

  /** form method */
  const form = useForm({
    defaultValues: defaultCountry,
    onSubmit: async ({ value }) => {
      /** verify the username exist or not */
      if (isUsername === 'userNotFound') {
        showToast({
          type: 'error',
          title: 'User not found',
          description: 'Please sign in again.',
        })
        return navigate(paths.login)
      }

      removeUserEmail()
      setUserAuthentication('authenticated')
      showToast({
        type: 'success',
        title: 'Successfully registered the user',
        description: JSON.stringify(value),
      })

      navigate(`/${isUsername}`)
    },
  })

  return (
    <div className="app_auth_inside_cover">
      <h1>Choose your country</h1>
      <p>
        You're almost there! <br />
        Let's complete the final step
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
              name="reagion"
              validators={{
                onSubmit: ({ value }) => {
                  return !value ? 'Please enter a reagion' : null
                },
              }}
              children={() => {
                return (
                  <>
                    <label>Country/Region:</label>
                    <Dropdown
                      groups={groups}
                      selectedId={selectedId}
                      onSelect={item => setSelectedId(item.id)}
                    />
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
