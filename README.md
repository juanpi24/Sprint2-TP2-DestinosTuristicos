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

---

## 📂 Estructura del Proyecto

```text
src/
├── components/
│   ├── Footer.jsx          # Pie de página con créditos
│   ├── ItemCard.jsx        # Tarjeta individual con badge y botón toggle
│   ├── ItemList.jsx        # Grilla de destinos y mensaje de “Sin resultados”
│   ├── ListPanel.jsx       # Panel/modal lateral con la lista guardada y botón vaciar
│   ├── Navbar.jsx          # Cabecera con marca y contador derivado
│   └── SearchBar.jsx       # Input controlado de búsqueda
├── data/
│   └── destinations.js     # Base de datos local (20 destinos turísticos)
├── hooks/
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


