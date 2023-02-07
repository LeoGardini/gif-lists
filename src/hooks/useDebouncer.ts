import { useEffect, useState } from "react";

function useDebouncer<T>(state: T, timeout: number = 500) {
  const [debounced, setDebounced] = useState(state);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(state), timeout);

    return () => {
      clearTimeout(handler);
    };
  }, [state, timeout]);

  return debounced;
}

export default useDebouncer;
