# MundialCartas2026

App móvil nativa para iOS y Android creada con Vue 3, Ionic Vue y Capacitor para llevar el control del álbum Panini del Mundial 2026.

## Incluye

- Cuadrícula visual de 200 cartas de ejemplo.
- Marcado y desmarcado táctil por carta.
- Estado persistente con almacenamiento local.
- Contadores de tengo, me faltan y total.
- Buscador por número.
- Filtros: todas, tengo y me faltan.
- Reinicio de colección.
- Exportar e importar progreso JSON.
- Modo oscuro.

## Estructura

- `src/App.vue` coordina toda la pantalla principal.
- `src/components/` contiene la UI por piezas.
- `src/composables/useCollection.ts` maneja estado, filtros y persistencia.
- `src/data/stickers.ts` contiene los datos de ejemplo del 1 al 200.

## Ejecutar

1. Instala dependencias con `npm install`.
2. Inicia en desarrollo con `npm run dev`.
3. Genera el build con `npm run build`.

## Preparar iOS y Android

1. Ejecuta `npm run build`.
2. Sincroniza Capacitor con `npm run cap:sync`.
3. Añade plataformas con `npm run cap:add:ios` y `npm run cap:add:android`.
4. Abre con `npm run cap:open:ios` o `npm run cap:open:android`.

## Sustituir los datos de ejemplo

Edita `src/data/stickers.ts` y reemplaza la lista generada por la colección real cuando tengas el listado final del álbum.