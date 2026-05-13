# Mundial 2026 PWA

## Instalar en iPhone sin Mac

1. Abre la app en Safari desde una URL publicada.
2. Toca el botón de compartir.
3. Elige **Añadir a pantalla de inicio**.
4. Confirma.

## Despliegue gratis recomendado

### Opción 1: GitHub Pages

```bash
npm run build
```

Sube la carpeta `dist/` a GitHub Pages o usa una acción de GitHub para publicar automáticamente.

### Opción 2: Netlify

```bash
npm run build
```

Luego arrastra la carpeta `dist/` a Netlify o conecta el repositorio para despliegue automático.

### Opción 3: Vercel

```bash
npm run build
```

Importa el repositorio y deja que Vercel detecte Vite.

## Notas

- Esta app funciona como PWA básica.
- En iPhone, la instalación real es desde Safari con **Añadir a pantalla de inicio**.
- El service worker cachea la shell principal para mejorar carga y uso offline básico.
