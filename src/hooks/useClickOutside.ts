/** node modules */
import { useEffect } from 'react'

/** custom hook */
export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  onClose: () => void,
) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, onClose])
}
