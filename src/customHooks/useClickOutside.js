//Test
import useEventListener from './useEventListener'

function useClickOutside(ref, cd) {
  useEventListener(
    'click',
    (e) => {
      if (ref.current == null || ref.current.contains(e.target)) return
      cd(e)
    },
    document,
  )
}

export default useClickOutside
