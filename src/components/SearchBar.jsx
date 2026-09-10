import { useMemo } from 'react';

/**
 * Este componente representa una barra de búsqueda que permite a los usuarios buscar lugares y filtrar por categorías.
 * 
 * Props: 
 *   - search: Valor actual de la búsqueda.
 *   - onSearchChange: Función para manejar el cambio en el input de búsqueda.
 *   - category: Categoría seleccionada.
 *   - onCategoryChange: Función para manejar el cambio en la categoría.
 *   - items: Lista completa de destinos.
 */
export function SearchBar({ 
  search, 
  onSearchChange, 
  category, 
  onCategoryChange,
  items = [] 
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

      {/* Campo de Búsqueda por texto */}
      <div className="relative flex items-center w-full">
        <label htmlFor="search" className="sr-only">
          Buscar por nombre de lugar o provincia
        </label>
        {/* Corrección del color de ícono usando token existente */}
        <span className="material-symbols-outlined absolute left-4 text-on-surface-variant/60 pointer-events-none">
          search
        </span>
        <input
          type="text"
          id="search" 
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nombre de lugar o provincia..."
          className="w-full bg-surface-container pl-12 pr-4 py-3.5 rounded-full border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner transition-colors duration-150"
        />
      </div>

      {/* Chips de Categorías */}
      {/* Agregamos clases utilitarias para esconder la barra de scroll de forma nativa en navegadores modernos */}
      <div className="w-full flex gap-2 overflow-x-auto py-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((cat) => {
          const isActive = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-primary/10 border border-primary text-primary'
                  : 'bg-surface-container border border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
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
