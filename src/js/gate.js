// Zaślepka na czas prac: strona jest zasłonięta do podania hasła.
// Uwaga: to blokada wyłącznie po stronie przeglądarki (w repozytorium jest tylko hash hasła),
// nie chroni treści przed kimś, kto zajrzy w źródło. Usunięcie: skasuj <script src="/js/gate.js"> z obu stron HTML.
(() => {
  const HASH = '3d9c549921bbfcab79998b22ac76c88f824e9dbc01ab1db447a72e0a76daf266';
  const KEY = 'site-gate';
  const root = document.documentElement;

  const sha256 = async (text) => {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  try {
    if (localStorage.getItem(KEY) === HASH) return;
  } catch (e) { /* brak localStorage: pokaż bramkę */ }

  const hide = document.createElement('style');
  hide.textContent = 'html.gated body>*:not(#gate){display:none!important}html.gated body{overflow:hidden}';
  document.head.appendChild(hide);
  root.classList.add('gated');

  const build = () => {
    const wrap = document.createElement('div');
    wrap.id = 'gate';
    wrap.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;background:#020617;color:#fff;font-family:Inter Variable,Inter,system-ui,sans-serif';
    wrap.innerHTML =
      '<form style="width:100%;max-width:360px;display:flex;flex-direction:column;gap:14px;text-align:center">' +
      '<h1 style="margin:0;font-size:22px;font-weight:700">Strona w przygotowaniu</h1>' +
      '<p style="margin:0;color:#94a3b8;font-size:15px">Podaj hasło, aby zobaczyć podgląd.</p>' +
      '<input type="password" autocomplete="current-password" aria-label="Hasło" placeholder="Hasło" style="padding:14px 16px;border-radius:8px;border:1px solid #334155;background:#0f172a;color:#fff;font-size:16px">' +
      '<button type="submit" style="padding:14px 16px;border-radius:8px;border:0;background:#fff;color:#020617;font-size:15px;font-weight:600;cursor:pointer">Wejdź</button>' +
      '<p role="alert" style="margin:0;min-height:20px;color:#f87171;font-size:14px"></p>' +
      '</form>';
    document.body.appendChild(wrap);

    const input = wrap.querySelector('input');
    const msg = wrap.querySelector('[role=alert]');
    input.focus();
    wrap.querySelector('form').addEventListener('submit', async (e) => {
      e.preventDefault();
      if (await sha256(input.value) === HASH) {
        try { localStorage.setItem(KEY, HASH); } catch (err) { /* ignoruj */ }
        root.classList.remove('gated');
        wrap.remove();
      } else {
        msg.textContent = 'Nieprawidłowe hasło.';
        input.select();
      }
    });
  };

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
