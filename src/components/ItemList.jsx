import { ItemCard } from './ItemCard';
/**
 * Este componente representa una lista de elementos (destinos) que se muestran en la interfaz.
 * Props:
 *   - items: Array de elementos a mostrar.
 *   - watchlist: Array de IDs de elementos que están en la lista de seguimiento.
 *   - onToggle: Función para alternar la inclusión de un elemento en la lista.
 *   - search: Texto de búsqueda actual.
 *   - onResetSearch: Función para restablecer la búsqueda.
 */
export function ItemList({ items, watchlist, onToggle, search, onResetSearch }) {
 
 /* Si no hay elementos que coincidan con la búsqueda, se muestra un mensaje indicando que no se encontraron resultados.
    Se proporciona un botón para restablecer la búsqueda y ver todos los destinos. */
  if (items.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/40 rounded-2xl p-8 bg-surface-container/40 text-center my-4">
        <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-3">
          <span className="material-symbols-outlined text-3xl">explore</span>
        </div>
        <h4 className="text-lg font-bold text-on-surface mb-1">
          No encontramos nada para "{search}"
        </h4>
        <p className="text-sm text-on-surface-variant max-w-xs">
          Intenta buscar por provincia o explora las categorías en los chips superiores.
        </p>

        {/* Botón para restablecer la búsqueda y ver todos los destinos */}
        <button
          type="button"
          onClick={onResetSearch}
          className="mt-4 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/40 text-primary text-xs font-semibold hover:bg-surface-bright transition-colors cursor-pointer"
        >
          Ver todos los destinos
        </button>
      </section>
    );
  }

  /* Si hay elementos que coinciden con la búsqueda, se renderiza la lista de ítems utilizando el componente ItemCard para cada elemento. */
  return (
    <section className="flex flex-col gap-6">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          isInList={watchlist.includes(item.id)}
          onToggle={onToggle}
        />
      ))}
    </section>
  );
}