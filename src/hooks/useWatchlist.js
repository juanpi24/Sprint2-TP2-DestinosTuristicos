import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

/* El hook useWatchlist se encarga de manejar la lista de seguimiento de destinos turísticos.
   Permite agregar o eliminar destinos de la lista, así como vaciarla por completo.
   Además, actualiza dinámicamente el título de la pestaña del navegador según la cantidad de ítems en la lista. 
   Valore por defecto: storageKey = 'mis-destinos-favs', initialItems = ['talampaya', 'perito-moreno', 'iguazu'].
   */

export function useWatchlist(storageKey = 'mis-destinos-favs', initialItems = []) {
  
  /* Se utiliza el hook useLocalStorage para manejar la lista de ítems guardados en el almacenamiento local del navegador.
     Se inicializa con una clave de almacenamiento (storageKey) y un conjunto de ítems iniciales (initialItems). */
  const [list, setList] = useLocalStorage(storageKey, initialItems);

  // Requisito Bloque B: Título dinámico en la pestaña según los ítems guardados
  /* Se utiliza useEffect para actualizar dinámicamente el título de la pestaña del navegador según la cantidad de ítems en la lista.
     Si la lista tiene elementos, se muestra la cantidad de ítems entre paréntesis en el título.
     Si la lista está vacía, se muestra solo el título base. */
  useEffect(() => {
    if (list.length > 0) {
      document.title = `(${list.length}) Mis Destinos - Expediciones`;
    } else {
      document.title = `Mis Destinos - Expediciones`;
    }
  }, [list]); 

  // Toggle inmutable: sin splice, usando spread y filter
  /* La función toggleItem permite alternar la inclusión de un ítem en la lista de seguimiento.
     Si el ítem ya está en la lista, se elimina utilizando filter.
     Si el ítem no está en la lista, se agrega utilizando spread operator. */
  const toggleItem = (id) => {
    setList((prevList) =>
      prevList.includes(id)
        ? prevList.filter((item) => item !== id)
        : [...prevList, id]
    );
  };

// Limpieza de estado y localStorage con confirmación nativa
const clearList = () => {
  //if (window.confirm("¿Estás seguro de que deseas vaciar la lista?")) {
    // 1. Limpia el estado de la lista
    setList([]);
    
    // 2. Elimina el elemento del almacenamiento usando su clave
    localStorage.removeItem('mis-destinos-favs');
  //}
};

  return {
    list,
    count: list.length,
    toggleItem,
    clearList
  };
}