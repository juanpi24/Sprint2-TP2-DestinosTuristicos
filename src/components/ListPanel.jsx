import { useEffect } from 'react';
import { useToggle } from '../hooks/useToggle';
import { ConfirmationModal } from './ConfirmationModal';

/**
 * Componente ListPanel
 * @param {boolean} isOpen - Indica si el panel está abierto.
 * @param {function} onClose - Función para cerrar el panel.
 * @param {Array} watchlist - Lista de IDs de destinos seleccionados.
 * @param {Array} allDestinations - Lista completa de destinos disponibles.
 */

export function ListPanel({
  isOpen,
  onClose,
  watchlist,
  allDestinations,
  onToggle,
  onClearList,
}) {

  
  /* Usamos useToggle local para controlar el modal de confirmación*/
  const [isConfirmOpen, , openConfirm, closeConfirm] = useToggle(false);
  
  // Bonus: Cierre del modal presionando la tecla Escape
  /* Se utiliza useEffect para agregar un event listener al objeto window que escucha el evento 'keydown'.
     Si la tecla presionada es 'Escape', se llama a la función onClose para cerrar el panel.
     Se limpia el event listener cuando el componente se desmonta o cuando isOpen cambia. */

  useEffect(() => {
    /* Si el panel no está abierto, no se agrega el event listener. */
    if (!isOpen) return;

    /* Función que maneja el evento 'keydown' y cierra el panel si se presiona la tecla Escape. */
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    /* Se agrega el event listener al objeto window para escuchar el evento 'keydown'.
       Se llama a la función handleKeyDown cuando se presiona una tecla. */
    window.addEventListener('keydown', handleKeyDown);

    /* Se devuelve una función de limpieza que elimina el event listener cuando el componente se desmonta o cuando isOpen cambia. */
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);  // Se ejecuta solo cuando el panel se abre/cierra o cambia la función de cierre


  /* Esta función se ejecuta al presionar "Confirmar" en el modal */
  const handleClearList = () => {
    onClearList();  // Borra los datos (y limpia el localStorage a través del hook)
    closeConfirm(); // Cierra el modal de confirmación
  };

  /* Si el panel no está abierto, no se renderiza nada. */
  if (!isOpen) return null;

  /* Se filtran los destinos completos (allDestinations) para obtener solo aquellos cuyos IDs están presentes en la lista de watchlist. */
  const selectedDestinations = allDestinations.filter((dest) =>
    watchlist.includes(dest.id),
  );

  return (
    <>
      {/* Backdrop con Blur */
      /* Se utiliza un div que cubre toda la pantalla con un fondo semitransparente y un efecto de desenfoque (backdrop-blur).
         Se aplica un z-index alto para que esté por encima del contenido principal.
         Al hacer clic en el backdrop, se llama a la función onClose para cerrar el panel. */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-sm z-50 transition-opacity"
      />

      {/* Drawer Lateral */
      /* Se utiliza un aside que actúa como un panel lateral (drawer) que se muestra a la derecha de la pantalla.
         Se aplican clases de Tailwind CSS para estilos, efectos visuales y responsividad.
         El panel contiene un header con título y botón de cierre, un contador de destinos seleccionados, una lista de ítems seleccionados o un estado vacío, y un footer con acciones para vaciar la lista. */}
      <aside className="fixed top-0 right-0 h-full w-80 max-w-[88vw] z-50 bg-surface-container-low border-l border-outline-variant/30 shadow-2xl backdrop-blur-2xl flex flex-col justify-between p-6">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">
                bookmark
              </span>
              <h2 className="text-lg font-bold text-on-surface">
                Mi Lista de Destinos
              </h2>
            </div>

            {/* Botón de Cierre */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar panel"
              className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Subtítulo Contador */}
          <div className="flex items-center justify-between py-3">
            <span className="text-xs text-on-surface-variant">
              Destinos seleccionados
            </span>

            {/* Contador de destinos seleccionados */}
            <span className="text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary-container/20 border border-primary/40">
              {selectedDestinations.length}{' '}
              {selectedDestinations.length === 1 ? 'destino' : 'destinos'}
            </span>
          </div>

          {/* Lista de ítems o Empty State */}
          <div className="flex flex-col gap-3 mt-2 overflow-y-auto max-h-[60vh] pr-1">
            {/* Se verifica si la lista de destinos seleccionados está vacía.
              Si está vacía, se muestra un estado vacío con un ícono y un mensaje.
              Si no está vacía, se mapea la lista de destinos seleccionados para renderizar cada ítem con su imagen, título, ubicación y un botón para quitarlo de la lista. */}

            {selectedDestinations.length === 0 ? (
              <div className="text-center py-8 text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl mb-2 text-outline">
                  playlist_remove
                </span>
                <p className="text-sm">
                  Tu lista está vacía. Busca un destino arriba y agrégalo.
                </p>
              </div>
            ) : (
              selectedDestinations.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container border border-outline-variant/30"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-11 h-11 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs text-on-surface font-semibold truncate">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-on-surface-variant truncate">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Botón para quitar destino de la lista */}
                  <button
                    type="button"
                    onClick={() => onToggle(item.id)}
                    className="ml-2 text-error border border-error/40 hover:bg-error-container/20 rounded-lg px-2 py-1 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
                  >
                    Quitar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Acciones del Footer */}
        <div className="flex flex-col gap-2.5 pt-4 border-t border-outline-variant/30 mt-auto">
          {/* Botón para vaciar la lista de destinos */}
          <button
            type="button"
            /*onClick={onClearList}*/
            onClick={openConfirm} // Abre el modal de confirmación en lugar de borrar directo
            disabled={selectedDestinations.length === 0}
            className="w-full py-2.5 rounded-xl bg-error-container/30 border border-error/30 text-error hover:bg-error-container/50 font-semibold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              delete_sweep
            </span>
            <span>Vaciar mi lista</span>
          </button>
        </div>
      </aside>

      {/* MODAL DE CONFIRMACIÓN (Se superpone a todo cuando se activa) */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={handleClearList} // Pasa la función unificada
        title="¿Vaciar lista de favoritos?"
        message="¿Estás seguro de que querés eliminar todos tus lugares guardados? Esta acción limpiará tu almacenamiento."
      />
    </>
  );
}
