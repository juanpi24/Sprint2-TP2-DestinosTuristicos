export function Navbar({ count, onOpenDrawer,isDark, onToggleDarkMode }) {
  return (
    <>
      {/* TopAppBar Fixed Header */

      /* Se utiliza un header fijo con z-index alto para que siempre esté visible en la parte superior de la página.
         Se aplican clases de Tailwind CSS para estilos y efectos visuales como sombra, desenfoque y transición de colores. */  
      }

      <header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-4 w-full h-16 bg-surface-container/90 shadow-md backdrop-blur-md border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
        {/* Logo del sitio y titulo */}
          <img 
            src="/vuelo.png" 
            alt="Logo de Mis Destinos" 
            className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 object-contain transition-all duration-200" 
          />
          <h1 className="font-headline-sm text-xl font-extrabold text-primary tracking-tight">
            Mis Destinos
          </h1>
        </div>

       {/* Mi Lista Trigger Button with Badge */

       /* Se utiliza un botón que actúa como disparador para abrir el drawer de la lista de destinos.
          Se muestra un badge con la cantidad de ítems en la lista solo si count es mayor a 0.
          Se aplican clases de Tailwind CSS para estilos, efectos visuales y responsividad. */  
       }  

       {/* Botón de Modo Oscuro / Claro */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label="Cambiar tema"
            className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

        <button
          type="button"
          onClick={onOpenDrawer}
          aria-label="Abrir Mi Lista de Destinos"
          className="flex items-center gap-2 bg-surface-container-high px-3.5 py-1.5 rounded-full border border-outline-variant/40 hover:bg-surface-bright transition-colors duration-150 active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-primary text-[20px]">bookmark</span>
          <span className="font-label-md text-sm text-on-surface font-medium hidden sm:inline">
            Mi Lista
          </span>

          {/* Renderizado condicional del badge sin trampa de falsy render (count > 0) */

          /* Se utiliza un renderizado condicional para mostrar el badge solo si count es mayor a 0.
             Esto evita que se renderice un badge vacío o con valor 0, mejorando la experiencia del usuario. */  
          }
          {count > 0 && (
            <span className="bg-primary-container text-on-primary-container text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
              {count}
            </span>
          )}
        </button>
      </header>
    </>
  );
}