export function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  // Si el estado es false, no renderizamos nada en pantalla
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Caja del Modal */}
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        
        {/* Botones de acción */}
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose} // Cierra el modal (setClose)
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button 
            onClick={() => {
              onConfirm(); // Ejecuta la acción (ej: vaciar lista)
              onClose();   // Cierra el modal después de confirmar
            }} 
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}