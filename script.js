// Ciudad Sangrienta · Portal actualizado para Unidad 4.
// Los enlaces internos SOLO desplazan al jugador. Únicamente START descarga Unity.
'use strict';

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));

// Los accesos a los videojuegos enfocan el botón START sin iniciar Unity.
// En páginas extensas evitamos la animación de desplazamiento que dejaría el
// botón fuera de pantalla durante varios segundos.
document.querySelectorAll('a[href="#jugar"],a[href="#laberinto-jugar"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    history.replaceState(null, '', id);
    const top = target.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'instant' });
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}
const header = document.querySelector('.header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30), { passive: true });

function createUnityPlayer(settings) {
  const shell = document.getElementById(settings.shell);
  const frame = document.getElementById(settings.frame);
  const startButton = document.getElementById(settings.start);
  const loading = document.getElementById(settings.loading);
  const state = document.getElementById(settings.state);
  const fullButton = document.getElementById(settings.fullscreen);
  const reloadButton = document.getElementById(settings.reload);
  const stopButton = document.getElementById(settings.stop);
  let started = false;
  let otherPlayer = null;

  function resetControls(active) {
    startButton.disabled = active;
    startButton.textContent = active ? '✓ JUEGO EN EJECUCIÓN' : settings.startLabel;
    [fullButton, reloadButton, stopButton].forEach(button => button.disabled = !active);
  }

  function launch() {
    if (started) return;
    // No se cargan dos builds WebGL simultáneamente para ahorrar memoria/GPU.
    if (otherPlayer && otherPlayer.isRunning()) otherPlayer.stop();
    started = true;
    shell.classList.add('is-started');
    loading.hidden = false;
    state.textContent = 'CARGANDO UNITY WEBGL...';
    resetControls(true);
    // No existe atributo src en el HTML; se añade SOLO cuando el usuario pulsa START.
    frame.src = frame.dataset.src;
  }

  function stop() {
    if (document.fullscreenElement === shell && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    frame.removeAttribute('src');
    started = false;
    shell.classList.remove('is-started');
    loading.hidden = true;
    state.textContent = 'ESPERANDO START';
    resetControls(false);
  }

  function reload() {
    if (!started) return;
    loading.hidden = false;
    state.textContent = 'RECARGANDO UNITY WEBGL...';
    // Recargar solo dentro del mismo iframe, sin abrir otra ventana.
    frame.removeAttribute('src');
    frame.src = frame.dataset.src;
  }

  startButton.addEventListener('click', launch);
  reloadButton.addEventListener('click', reload);
  stopButton.addEventListener('click', stop);
  frame.addEventListener('load', () => {
    if (!started) return;
    // 'load' confirma recepción del iframe, no que Unity haya terminado su inicialización.
    loading.hidden = true;
    state.textContent = 'VISOR ABIERTO · HAZ CLIC EN EL JUEGO';
  });
  fullButton.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement === shell) await document.exitFullscreen();
      else if (shell.requestFullscreen) await shell.requestFullscreen();
    } catch (_) {
      state.textContent = 'PANTALLA COMPLETA NO DISPONIBLE';
    }
  });
  document.addEventListener('fullscreenchange', () => {
    const isFull = document.fullscreenElement === shell;
    fullButton.textContent = isFull ? '⤢ SALIR PANTALLA COMPLETA' : '⛶ PANTALLA COMPLETA';
    fullButton.setAttribute('aria-label', isFull ? 'Salir de pantalla completa' : 'Expandir el juego a pantalla completa');
  });

  return { stop, setOtherPlayer: (player) => { otherPlayer = player; }, isRunning: () => started };
}

const runnerPlayer = createUnityPlayer({
  shell: 'game-shell', frame: 'game-frame', start: 'start-game', loading: 'game-loading',
  state: 'game-state', fullscreen: 'fullscreen-game', reload: 'reload-game', stop: 'stop-game',
  startLabel: '▶ START · JUEGO 1'
});
const mazePlayer = createUnityPlayer({
  shell: 'maze-game-shell', frame: 'maze-game-frame', start: 'maze-start-game', loading: 'maze-game-loading',
  state: 'maze-game-state', fullscreen: 'maze-fullscreen-game', reload: 'maze-reload-game', stop: 'maze-stop-game',
  startLabel: '▶ START · JUEGO 2'
});
runnerPlayer.setOtherPlayer(mazePlayer);
mazePlayer.setOtherPlayer(runnerPlayer);
// Navegación HTML mediante href="#jugar" / href="#laberinto-jugar", sin autoarranque.
