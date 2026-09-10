# 📍 Mis Destinos — Watchlist de Lugares para Visitar

Aplicación web interactiva desarrollada con **Vite + React** y estilizada con **Tailwind CSS**. Permite explorar un catálogo de destinos turísticos de Argentina, filtrarlos en tiempo real y gestionar una lista personal de viajes guardada de forma persistente.

Proyecto desarrollado para el **Trabajo Práctico del Sprint 2**.

---

## 🛠️ Tecnologías Utilizadas

- **React 18 / 19** (Vite)
- **Tailwind CSS v4**
- **JavaScript (ES6+)**
- **LocalStorage API** para persistencia de datos

---

## 📋 Características y Funcionalidades

1. **Catálogo de Destinos:** muestra 20 lugares turísticos con categoría, ubicación, puntaje y badge condicional `DESTACADO`.
2. **Buscador controlado:** filtra en tiempo real por nombre del lugar o provincia con gestión de estado vacío.
3. **Lista personal inmutable:** agrega y quita ítems sin mutar arrays mediante `spread` y `filter`.
4. **Contador y título dinámico:**
   - Badge en el navbar que indica el total de la lista (oculto si es 0).
   - `useEffect` que sincroniza la cantidad de ítems con el título de la pestaña del navegador (`document.title`).
5. **Persistencia en LocalStorage:** lectura inicial lazy para evitar borrado accidental y manejo de errores con `try/catch` ante datos corruptos.
6. **Panel lateral accesible (modal):** despliega la lista guardada con opción de quitar ítems o vaciarla por completo.
7. **Bonus — cierre con tecla Escape:** el panel escucha el evento `keydown` global y se cierra al presionar `Escape`, con limpieza en `useEffect`.
8. **Bonus — modo oscuro/claro:** botón en el navbar que alterna tema. Detecta la preferencia del sistema operativo (`prefers-color-scheme`) la primera vez, y a partir de ahí persiste la elección del usuario en `localStorage` a través de `useDarkMode`, que reutiliza `useLocalStorage`.

---

## 🧠 Decisiones de estado

- **`watchlist` vive en `App.jsx`**, a través del hook `useWatchlist()`, porque es el ancestro común de todos los componentes que la necesitan: `Navbar` (contador), `ItemList`/`ItemCard` (saber si un destino ya está agregado) y `ListPanel` (mostrar la lista completa). Se modifica con **una sola función `toggleItem`**, sin mutar el array (`spread` + `filter`).
- **La watchlist guarda solo los `id` de los destinos** (`['talampaya', 'iguazu']`), no los objetos completos. Los componentes que necesitan el destino entero (`ListPanel`) lo reconstruyen filtrando `DESTINATIONS` por esos ids. Menos redundancia en `localStorage` y una sola fuente de verdad para los datos del destino (`data/destinations.js`).
- **`count` e `isInList` son estado derivado, no estado propio.** `count` es `list.length` y `isInList` es `watchlist.includes(item.id)`, calculados en cada render. Guardarlos en un `useState` aparte los desincronizaría de la lista real tarde o temprano.
- **`searchQuery` y `selectedCategory` viven en `App.jsx`** como estados independientes, y `filteredDestinations` se deriva de ambos con `useMemo` (se recalcula solo cuando cambia alguno de los dos, no en cada render).
- **`isConfirmOpen` vive local en `ListPanel.jsx`** (con su propio `useToggle`), no en `App`, porque solo ese panel necesita saber si el modal de confirmación está abierto. Cada instancia de `useToggle` es independiente entre sí.
- **`isDark` vive en `App.jsx`** a través de `useDarkMode()`, que por dentro reutiliza `useLocalStorage` (no reinventa la persistencia). Se eligió `App` como dueño porque, aunque hoy solo lo consume `Navbar`, es un estado de tema que en el futuro podría afectar a cualquier componente — mejor tenerlo arriba desde el principio que tener que subirlo después.

## 🔁 Qué se simplificó con el refactor del Bloque D

Antes de extraer los hooks, `App.jsx` tenía el `useState` de la lista, el `useEffect` de lectura/escritura en `localStorage` con sus `try/catch`, el `useEffect` del título de la pestaña y la función `toggleItem`, todo mezclado en un solo componente. Después del refactor:

- `localStorage`, `JSON.parse` y `JSON.stringify` quedaron encapsulados **únicamente** en `useLocalStorage.js`.
- `App.jsx` pasó a consumir una sola línea (`const { list, count, toggleItem, clearList } = useWatchlist()`) sin saber ni le importa cómo se persiste la lista.
- La lógica de abrir/cerrar (drawer y modal de confirmación) se repetía como `useState` + funciones sueltas en varios lugares; con `useToggle` quedó reducida a una línea por cada estado booleano, reutilizada en `App` y en `ListPanel`.

---

```text
src/
├── components/
│   ├── Footer.jsx          # Pie de página con créditos
│   ├── ItemCard.jsx        # Tarjeta individual con badge y botón toggle
│   ├── ItemList.jsx        # Grilla de destinos y mensaje de “Sin resultados”
│   ├── ListPanel.jsx       # Panel/modal lateral con la lista guardada y botón vaciar
│   ├── Navbar.jsx          # Cabecera con marca y contador derivado
│   ├── SearchBar.jsx       # Input controlado de búsqueda
│   └── ConfirmationModal.jsx # Modal de confirmación para vaciar la lista
├── data/
│   └── destinations.js     # Base de datos local (20 destinos turísticos)
├── hooks/
│   ├── useDarkMode.js      # Hook de dominio para el tema claro/oscuro (persistido)
│   ├── useLocalStorage.js  # Hook genérico para sincronizar estado con LocalStorage
│   ├── useToggle.js        # Hook auxiliar para abrir/cerrar estados booleanos
│   └── useWatchlist.js     # Hook de dominio para la lista de lugares
├── App.jsx                 # Componente principal / orquestador
├── index.css               # Configuración de Tailwind v4 y variables
├── main.jsx                # Punto de entrada de la aplicación
└── assets/                 # Recursos estáticos del proyecto
```

---

## ▶️ Cómo correrlo

1. Cloná el repositorio e ingresá a la carpeta del proyecto:

```bash
git clone https://github.com/juanpi24/Sprint2-TP2-DestinosTuristicos
cd Sprint2-TP2-DestinosTuristicos
```

2. Instalá las dependencias:

```bash
npm install
```

3. Iniciá el servidor de desarrollo local:

```bash
npm run dev
```

---    

## 🚀 Deploy online (Netlify)
* [Mis Destinos ](https://destinosturisticoslist.netlify.app/)