CIUDAD SANGRIENTA · PORTAL DE DOS VIDEOJUEGOS
PRÁCTICA: GED - 26 - Actualizar Portal (UNIDAD 4)

PROYECTO: ¡YA ESTÁ LISTO PARA ABRIR EN VISUAL STUDIO CODE!

1. Abre la carpeta Portal_Ciudad_Sangrienta en Visual Studio Code.
2. Abre index.html mediante la extensión Live Server (recomendado).
3. En el portal verás:
   - Banner principal con nombre del desarrollador y protagonista.
   - Selector con ENLACE JUEGO 1 (rojo/magenta) y ENLACE JUEGO 2 (verde).
   - SECCIÓN JUEGO 1 con su botón START encima del visor.
   - SECCIÓN JUEGO 2 con su propio botón START encima del visor.
   - Historia, personaje, mecánicas y datos de ambos videojuegos.
4. Presiona uno de los enlaces del selector: la misma página baja al juego elegido.
5. Presiona START para cargar el juego en el visor integrado. Haz clic dentro
   del visor para que las flechas del teclado actúen sobre Unity WebGL.
6. Usa PANTALLA COMPLETA, RECARGAR o CERRAR según necesites.

ENLACES DE LOS JUEGOS (DENTRO DE IFRAME, SIN PESTAÑAS NUEVAS):
Juego 1: https://aquamarine-pothos-2552f7.netlify.app/
Juego 2: https://illustrious-blancmange-930e81.netlify.app/

IMPORTANTE: No son copias locales de Unity. El portal inicia los visores al
presionar START y descarga cada build desde sus servidores Netlify. Se necesita
Internet y un navegador compatible con WebGL. La política de seguridad del sitio
remoto puede impedir la incrustación: en ese caso necesitarás la carpeta de build
Unity de cada juego para alojarla directamente en este portal. Un iframe cargado
no garantiza por sí solo que Unity haya completado su arranque.

CUMPLIMIENTO DE LA GUÍA UNIDAD 4:
[OK] Desarrollador visible en cabecera/banner.
[OK] Dos enlaces de selección desplazándose dentro de la página.
[OK] Dos secciones de juego apiladas, sin pestañas nuevas.
[OK] Botones START independientes sobre cada área.
[OK] Sin carga automática del juego cuando se abre la página.
[OK] Diseño responsivo y estilos del Runner rojo y Laberinto verde.
[PENDIENTE DE VERIFICACIÓN REAL] Que las dos builds de Unity se puedan ejecutar
  dentro de iframes desde los dos dominios externos Netlify.
[PENDIENTE] Publicar este portal actualizado en tu URL de GitHub Pages/Netlify.
[PENDIENTE] Capturas reales solicitadas en GED - 26:
  1. Vista del portal con el nombre del developer y ambos enlaces.
  2. START pulsado y JUEGO 2 corriendo dentro de la misma página.

ARCHIVOS:
index.html   -> una sola página HTML (no se creó una segunda página).
styles.css   -> estilos rojo/negro y verde oscuro por sección.
script.js    -> navegación, START por juego, cierre/recarga/fullscreen.
assets/      -> protagonista, ilustración de ciudad y plano laberinto.

Para publicar en GitHub Pages: sube TODO EL CONTENIDO de la carpeta
Portal_Ciudad_Sangrienta a la RAÍZ del repositorio que ya uses para el portal.
En Settings -> Pages elige Deploy from branch -> main -> /root.
No se puede publicar automáticamente desde este archivo ZIP.
