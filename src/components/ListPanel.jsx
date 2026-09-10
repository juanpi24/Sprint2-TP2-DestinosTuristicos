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
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  /* Esta función se ejecuta al presionar "Confirmar" en el modal */
  const handleClearList = () => {
    onClearList();  // Borra los datos
    closeConfirm(); // Cierra el modal de confirmación
    onClose();      // Cierra el panel lateral
  };

  /* Si el panel no está abierto, no se renderiza nada. */
  if (!isOpen) return null;

  /* Se filtran los destinos completos para obtener solo los agregados */
  const selectedDestinations = allDestinations.filter((dest) =>
    watchlist.includes(dest.id),
  );

  return (
    <>
      {/* Backdrop con Blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
      />

      {/* Drawer Lateral */}
      <aside className="fixed top-0 right-0 h-full w-80 max-w-[88vw] z-50 bg-surface-container border-l border-outline-variant/30 shadow-2xl flex flex-col justify-between p-6">
        <div className="flex flex-col h-full overflow-hidden">
          
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
            <span className="text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30">
              {selectedDestinations.length}{' '}
              {selectedDestinations.length === 1 ? 'destino' : 'destinos'}
            </span>
          </div>

          {/* Lista de ítems o Empty State */}
          <div className="flex flex-col gap-3 mt-2 overflow-y-auto flex-1 pr-1">
            {selectedDestinations.length === 0 ? (
              <div className="text-center py-8 text-on-surface-variant flex flex-col items-center justify-center h-full">
                <span className="material-symbols-outlined text-4xl mb-2 text-on-surface-variant/50">
                  playlist_remove
                </span>
                <p className="text-sm max-w-[200px]">
                  Tu lista está vacía. Busca un destino arriba y agrégalo.
                </p>
              </div>
            ) : (
              selectedDestinations.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/30"
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
            onClick={openConfirm}
            disabled={selectedDestinations.length === 0}
            className="w-full py-2.5 rounded-xl bg-error-container text-on-error-container hover:bg-error-container/80 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">delete_sweep</span>
            Vaciar Lista
          </button>
        </div>
      </aside>

      {/* Modal de Confirmación */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={handleClearList}
        title="¿Vaciar lista de destinos?"
        message="Esta acción quitará todos los destinos guardados de tu lista actual. No se puede deshacer."
      />
    </>
  );
}
