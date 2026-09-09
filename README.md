# 📍 Mis Destinos — Watchlist de Lugares para Visitar

Aplicación web interactiva desarrollada con **Vite + React** y estilizada con **Tailwind CSS**. Permite explorar un catálogo de destinos turísticos de Argentina, filtrarlos en tiempo real y gestionar una lista personal de viajes guardada de forma persistente.

Proyecto desarrollado para el **Trabajo Práctico del Sprint 2**.

---

## 🛠️ Tecnologías Utilizadas

- **React 18 / 19** (Vite)
- **Tailwind CSS v4**
- **JavaScript (ES6+)**
- **LocalStorage API** (para persistencia de datos)

---

## 📋 Características y Funcionalidades

1. **Catálogo de Destinos:** Muestra 20 lugares turísticos con categoría, ubicación, puntaje y badge condicional `DESTACADO`.
2. **Buscador Controlado:** Filtro en tiempo real por nombre de lugar o provincia con gestión de estado vacío.
3. **Lista Personal Inmutable:** Agregado y quitado de ítems sin mutar arrays (`spread` y `filter`).
4. **Contador y Título Dinámico:** 
   - Badge en el Navbar que indica el total de la lista (oculto si está en 0).
   - `useEffect` que sincroniza la cantidad de ítems con el título de la pestaña del navegador (`document.title`).
5. **Persistencia en LocalStorage:** Lectura inicial *lazy* para evitar borrado accidental y manejo de errores con `try/catch` ante datos corruptos.
6. **Panel Lateral Accesible (Modal):** Despliegue de la lista guardada con opción de quitar ítems o vaciarla por completo.
7. **Bonus — Cierre con Tecla Escape:** El panel lateral escucha el evento `keydown` global y se cierra al presionar la tecla `Escape`, incluyendo su respectiva función de limpieza (*cleanup*) en `useEffect`.

---

## 📂 Estructura del Proyecto

src/
├── components/
│   ├── Footer.jsx         # Pie de página con créditos
│   ├── ItemCard.jsx       # Tarjeta individual con renderizado de badge y botón toggle
│   ├── ItemList.jsx       # Grilla de destinos y mensaje de "Sin resultados"
│   ├── ListPanel.jsx      # Panel/Modal lateral con la lista guardada y botón vaciar
│   ├── Navbar.jsx         # Cabecera con marca y contador derivado
│   └── SearchBar.jsx      # Input controlado de búsqueda
├── data/
│   └── destinations.js    # Base de datos local (20 destinos turísticos)
├── hooks/
│   ├── useLocalStorage.js # Hook genérico para sincronizar estado con LocalStorage
│   ├── useToggle.js       # Custom hook auxiliar para abrir/cerrar estados booleanos
│   └── useWatchlist.js    # Custom hook de dominio para la lista de lugares
├── App.jsx                # Componente principal / Orquestador
├── index.css              # Configuración de Tailwind v4 y variables
└── main.jsx               # Punto de entrada de la aplicación

---

## Cómo correrlo

1. Clonar el repositorio e ingresar a la carpeta del proyecto:
   ```bash
   git clone https://github.com/juanpi24/Sprint2-TP2-DestinosTuristicos 
   cd Sprint2-TP2-DestinosTuristicos

2. Instalar las dependencias:
    ```bash
    npm install

3. Iniciar el servidor de desarrollo local:
    ```bash
    npm run dev

---    

## 🚀 Deploy online (Netlify)
* [Mis Destinos ](https://destinosturisticoslist.netlify.app/) 


