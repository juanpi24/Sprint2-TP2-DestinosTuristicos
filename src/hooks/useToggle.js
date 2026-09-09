import { useState, useCallback } from 'react';

/**
 * Custom hook para manejar un estado de tipo toggle (activar/desactivar).
 * @param {boolean} initialState - El estado inicial del toggle.
 * @returns {Array} - Un array con el estado y las funciones para modificarlo.
 */
export function useToggle(initialState = false) {

  /**
   * useState para manejar el estado del toggle.
   * Se inicializa con el valor proporcionado o false por defecto.
   */
  const [state, setState] = useState(initialState);

  /**
   * Funciones para alternar, abrir y cerrar el toggle.
   * Se usan useCallback para memorizar las funciones y evitar re-renderizados innecesarios.
   */
  // Invierte el valor actual del estado (si está en true lo pasa a false, y viceversa)
  const toggle = useCallback(() => setState((prev) => !prev), []);

  // Fuerza el estado directamente a true - Abre un menú, mostrar un panel lateral (drawer)
  const setOpen = useCallback(() => setState(true), []);

  // Fuerza el estado directamente a false - Cerrar el panel, ocultar un menú al hacer clic afuera o cerrar un modal al presionar una "X"
  const setClose = useCallback(() => setState(false), []);


  /**
   * Retorna un array con el estado actual y las funciones para modificarlo.
   * Esto permite un uso más claro y organizado en los componentes que consumen este hook.
   */
  return [state, toggle, setOpen, setClose];
}