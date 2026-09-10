export function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  // Si el estado es false, no renderizamos nada en pantalla
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Caja del Modal */}
      <div className="bg-surface-container border border-outline-variant/30 rounded-lg p-6 max-w-sm w-full shadow-xl">
        <h3 className="text-lg font-bold text-on-surface mb-2">{title}</h3>
        <p className="text-sm text-on-surface-variant mb-6">{message}</p>
        
        {/* Botones de acción */}
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-on-surface bg-surface-container-high rounded-md hover:bg-surface-container-highest cursor-pointer transition-colors duration-150"
          >
            Cancelar
          </button>
          <button 
            onClick={() => {
              onConfirm(); 
              onClose();   
            }} 
            className="px-4 py-2 text-sm font-medium text-on-error-container bg-error-container rounded-md hover:bg-error-container/80 cursor-pointer transition-colors duration-150"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
