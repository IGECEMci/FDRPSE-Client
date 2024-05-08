import { useEffect, useState } from 'react';
/**
 * Los hooks son funciones que necesitan acceder a funciones propias de react, como lo son estados, efectos, etc.
 * y se usan para reutilizar lógica que pueda ser usada en diferentes puntos de la aplicación
 */
export const useDebounce = (value: string, delay = 450) => {

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };

  }, [value, delay]);

  return debouncedValue;

}