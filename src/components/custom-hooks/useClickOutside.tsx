// hooks/useClickOutsideListenerRef.tsx
import { useCallback, useEffect, useRef } from 'react';

const useClickOutside = (onClose: () => void) => {
  const ref = useRef(null);

  const escapeListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  const clickListener = useCallback(
    (event: MouseEvent) => {
      if (!(ref.current as any)?.contains(event.target)) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);

    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, [clickListener, escapeListener]);

  return ref;
};

export default useClickOutside;
