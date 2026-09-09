import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useDarkMode(storageKey = 'theme-mode') {
  // 1. Reutilizamos useLocalStorage. Si no hay valor previo, detectamos la preferencia del sistema operativo.
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark, setIsDark] = useLocalStorage(storageKey, prefersDark);

  // 2. Efecto secundario: Agrega o remueve la clase 'dark' en el <html> del DOM
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // 3. Función para alternar entre modo claro y oscuro
  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  return { isDark, toggleDarkMode };
}