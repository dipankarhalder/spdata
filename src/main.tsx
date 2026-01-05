/** node modules */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'

/** tanstack modules */
import { TanStackDevtools } from '@tanstack/react-devtools'
import { FormDevtoolsPlugin } from '@tanstack/react-form-devtools'

/** styles */
import './styles/global.scss'

/** components */
import { AppRouters } from '@/routers'

import { ToastProvider } from '@/shared/Toast/ToastProvider'

/** validate the root element */
const rootElem = document.getElementById('root') as HTMLElement | null
if (!rootElem) {
  throw new Error("The document does not contain an element with ID 'root'.")
}

/** root element */
const root = createRoot(rootElem)
root.render(
  <StrictMode>
    <ToastProvider>
      <AppRouters />
    </ToastProvider>
    <TanStackDevtools
      config={{ hideUntilHover: true }}
      plugins={[FormDevtoolsPlugin()]}
    />
  </StrictMode>,
)

/** pwa initialization */
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('New content available, refresh to update.')
  },
  onOfflineReady() {
    console.log('App ready to work offline.')
  },
})
