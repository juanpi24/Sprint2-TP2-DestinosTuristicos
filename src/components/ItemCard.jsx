/**
 * Componente que representa una tarjeta de elemento (destino) en la interfaz.
 * Props:
 *   - item: Objeto que representa el elemento a mostrar.
 *   - isInList: Booleano que indica si el elemento está en la lista de seguimiento.
 *   - onToggle: Función para alternar la inclusión del elemento en la lista.
 */
export function ItemCard({ item, isInList, onToggle }) {
  return (
    <article className="bg-surface-container rounded-2xl border border-outline-variant/30 overflow-hidden shadow-md flex flex-col transition-all duration-200">
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Capa de degradado integrada con las variables de superficie */}
        <div className="absolute inset-0 bg-linear-to-t from-surface-container via-surface-container/20 to-transparent" />
        
        {/* Badge condicional leyendo la propiedad booleana "destacado" */}
        {item.destacado && (
          <span className="absolute top-3 right-3 bg-tertiary-container/30 border border-tertiary text-tertiary text-xs px-2.5 py-0.5 rounded-full font-bold tracking-wide backdrop-blur-md">
            DESTACADO
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between">
            {/* Información del elemento: categoría, ubicación y calificación */}
            <span className="text-xs text-primary font-semibold tracking-wider uppercase truncate max-w-[70%]">
              {item.category} • {item.location}
            </span>
            
            {/* Badge de calificación con estrella y valor numérico */}
            <span className="text-xs text-tertiary font-bold flex items-center gap-1 shrink-0">
              ⭐ {item.rating.toFixed(1)} / 5.0
            </span>
          </div>
          {/* Título del elemento */}
          <h3 className="text-lg font-bold text-on-surface mt-1 line-clamp-1">{item.title}</h3>
        </div>

        {/* Botón dinámico con operador ternario basado en estado derivado */}
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          className={`mt-3 w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors duration-150 active:scale-95 shadow-sm cursor-pointer ${
            isInList
              ? 'bg-error-container text-on-error-container hover:bg-error-container/80'
              : 'bg-primary text-on-primary hover:bg-primary-fixed-dim'
          }`}
        >
          {/* Icono y texto dinámico basado en el estado "isInList" */}
          <span className="material-symbols-outlined text-[18px]">
            {isInList ? 'delete' : 'add'}
          </span>
          <span>{isInList ? 'Quitar de mi lista' : 'Agregar a mi lista'}</span>
        </button>
      </div>
    </article>
  );
}
