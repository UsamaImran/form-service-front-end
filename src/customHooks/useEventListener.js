import { useEffect, useRef } from 'react'

function useEventListener(eventType, callback, element = window) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    const handler = (e) => callbackRef.current(e)
    element.addEventListener(eventType, handler)

    return () => element.removeEventListener(eventType, handler)
  }, [eventType, element])
}

export default useEventListener
