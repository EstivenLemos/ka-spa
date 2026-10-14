# Katherine Ascensio — Spa / Beauty Website

Landing page estática, responsive y sin frameworks. Diseñada para publicarse gratis en GitHub Pages.

## Estructura

- `index.html` — estructura y textos de la página.
- `styles.css` — diseño, responsive y animaciones CSS.
- `script.js` — interacciones con JavaScript vanilla (WhatsApp, menú, galería, testimonios).
- `assets/img/` — fotografías usadas en la página (optimizadas, sin etiquetas incrustadas).
- `assets/img/ka-spa.jpg` — foto principal del inicio (versión optimizada de `ka spa.png`).
- `imgs/` — imágenes originales de referencia. La página no las usa; puedes conservarlas o borrarlas.

## 1. Datos de contacto

- Teléfono / WhatsApp: **310 293 9638** (`+57 310 293 9638`)
- Ubicación: **Acacías, Meta** — dirección provisional: **Acacías-Meta**

El número de WhatsApp se configura en `script.js`:

```js
const CONFIG = {
  whatsappNumber: "573102939638",
  whatsappMessage: "Hola Katherine, vi la página web y me gustaría ...",
  serviceMessage: "Hola Katherine, ... agendar una cita para {servicio}. ...",
  greetingDelay: 2200
};
```

Cada botón "Agendar" de los servicios abre WhatsApp con el nombre del servicio ya escrito.

Los enlaces de llamada (`tel:+573102939638`) y el texto visible del número están en `index.html`;
si cambias el número, busca `3102939638` y `310 293 9638` y reemplázalos.

### Cambiar la dirección

En `index.html` busca `Acacías-Meta` (sección Contacto y bloque `application/ld+json` del `<head>`)
y escribe la dirección exacta. Puedes también actualizar el enlace "Ver en Google Maps".

## 2. Foto principal

La foto del inicio es `assets/img/ka-spa.jpg`. Para cambiarla, reemplaza ese archivo (idealmente
una foto vertical, aprox. 4:5, en JPG de menos de 300 KB) o cambia la ruta en `index.html`
dentro de `<div class="hero-image">`.

## 3. Otras imágenes

Las fotos de servicios, galería, experiencia y "Nosotros" están en `assets/img/` y se referencian
con `<img src="assets/img/...">` en `index.html`. Para cambiar una, reemplaza el archivo manteniendo
el nombre, o cambia la ruta en el HTML.

## 4. Pendientes por completar

En `index.html` busca los textos entre `[ ]`:

- horarios
- testimonios reales de clientas

Y en el footer reemplaza los `href="#"` de Instagram y Facebook por las URLs reales.

## 5. Publicar en GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube `index.html`, `styles.css`, `script.js`, `.nojekyll` y la carpeta `assets`.
3. Ve a `Settings > Pages`.
4. En `Build and deployment`, selecciona `Deploy from a branch`.
5. Selecciona la rama `main` y carpeta `/ (root)`.
6. Guarda y espera el despliegue.

No necesitas Node.js, npm, React, Vite ni ningún proceso de build.

## Dependencias

No requiere npm, Node.js, frameworks, backend ni base de datos. La única carga externa es la hoja de
estilos de Google Fonts (Cormorant Garamond y Jost); si no carga, la página usa fuentes del sistema.
Los íconos e ilustraciones son SVG incluidos en el propio HTML.

## Características

- Diseño responsive (celular, tablet y escritorio).
- Header transparente que se transforma al hacer scroll y menú móvil animado.
- Cinta animada con los servicios.
- 5 tarjetas de servicio con reserva directa por WhatsApp.
- Destacado de productos profesionales SkinHealth en limpieza facial.
- Sección "Cómo reservar" en tres pasos.
- Galería con visor ampliado (teclado: ← → Esc).
- Slider de testimonios y preguntas frecuentes desplegables.
- Botón flotante de WhatsApp y saludo de bienvenida.
- Animaciones al hacer scroll, respetando `prefers-reduced-motion`.
