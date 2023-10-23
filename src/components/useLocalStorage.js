import { useState, useEffect } from "react";

function useLocalStorage(key, firstValue = null) {
  const initialValue = JSON.parse(localStorage.getItem(key)) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    console.debug("hooks useLocalStorage useEffect", "item=", item);

    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(item));
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;
