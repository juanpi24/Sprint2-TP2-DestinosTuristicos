import { useMemo } from 'react';

/**
 * Este componente representa una barra de búsqueda que permite a los usuarios buscar lugares y filtrar por categorías.
 * 
 * Props: 
 *   - search: Valor actual de la búsqueda.
 *   - onSearchChange: Función para manejar el cambio en el input de búsqueda.
 *   - category: Categoría seleccionada.
 *   - onCategoryChange: Función para manejar el cambio en la categoría.
 */
/*const CATEGORIES = ['Todos', 'Naturaleza', 'Aventura', 'Montaña', 'Lagos y Glaciares'];*/

export function SearchBar({ 
  search, 
  onSearchChange, 
  category, 
  onCategoryChange,
  items = [] // Se recibe la lista de destinos completa 
}) {

  // Derivamos las categorías de los datos en tiempo de ejecución (sin duplicados)
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(items.map((item) => item.category))];
    return ['Todos', ...uniqueCategories];
  }, [items]);

  return (
    <section className="flex flex-col gap-3 pt-2">
      <div>
        <span className="text-xs text-primary tracking-wider uppercase font-semibold">
          Territorios y Rutas Salvajes
        </span>
        <h2 className="text-2xl font-bold text-on-surface">
          Explora tu próxima aventura
        </h2>
      </div>

      {/* Input Controlado */
      /* Se utiliza un input controlado para manejar el valor de búsqueda.*/
      }
      {/* Campo de Búsqueda por texto */}
      <div className="relative flex items-center w-full">
        <label htmlFor="search" className="sr-only">
          Buscar por nombre de lugar o provincia
        </label>
        <span className="material-symbols-outlined absolute left-4 text-outline pointer-events-none">
          search
        </span>
        {/* Input de búsqueda controlado con placeholder y estilos */}
        <input
          type="text"
          id="search" 
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nombre de lugar o provincia..."
          className="w-full bg-surface-container pl-12 pr-4 py-3.5 rounded-full border border-outline-variant/30 text-on-surface placeholder:text-outline text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
        />
      </div>

      {/* Chips de Categorías */}
      {/* 🔀 Botones de Filtro por Categoría (Derivadas dinámicamente) */}
      <div className="w-full flex gap-2 overflow-x-auto py-1 no-scrollbar">

        {/* Mapeo de categorías para renderizar chips de selección */}

        {categories.map((cat) => {
          const isActive = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)} /* Se llama a la función onCategoryChange con la categoría seleccionada al hacer clic en el chip */
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
               
                /* Cambio de estilo según si el chip está activo o no */
                isActive
                  ? 'bg-primary-container/20 border border-primary text-primary'
                  : 'bg-surface-container-low border border-outline-variant/40 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
}