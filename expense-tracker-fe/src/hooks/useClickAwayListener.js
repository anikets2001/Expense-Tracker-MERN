import { useEffect } from 'react'

/**
 * Custom hook to detect clicks outside of a referenced element
 * @param {React.RefObject} ref - Reference to the element to detect clicks outside of
 * @param {Function} handler - Callback function to execute when click is outside
 * @param {boolean} isEnabled - Whether the listener should be active
 */
const useClickAwayListener = (ref, handler, isEnabled = true) => {
  useEffect(() => {
    if (!isEnabled) return

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event)
      }
    }

    // Use mousedown instead of click to capture the event earlier
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handler, isEnabled])
}

export default useClickAwayListener

