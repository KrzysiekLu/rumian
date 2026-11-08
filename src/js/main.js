(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const ICON_CLASS = 'ico';

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const icon = (name, className) => {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', `${ICON_CLASS} ${className}`);
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(SVG_NS, 'use');
    use.setAttribute('href', `/icons.svg#${name}`);
    svg.appendChild(use);
    return svg;
  };

  // Rok w stopce
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Menu desktop jest sticky; gdy dojedzie do góry, pokazujemy ikony szybkiego kontaktu
  const siteNav = document.querySelector('.site-nav');
  if (siteNav) {
    let ticking = false;
    const update = () => {
      siteNav.classList.toggle('is-stuck', siteNav.getBoundingClientRect().top <= 0);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  // Menu mobilne
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (menuBtn && menu) {
    const setOpen = (open) => {
      menu.classList.toggle('hidden', !open);
      menuBtn.setAttribute('aria-expanded', String(open));
    };
    menuBtn.addEventListener('click', () => setOpen(menu.classList.contains('hidden')));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  }

  // Strzałki karuzel
  const scrollRail = (id, dir) => {
    const rail = document.getElementById(id);
    if (!rail) return;
    const card = rail.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + 24 : rail.clientWidth;
    rail.scrollBy({ left: dir * step, behavior: 'smooth' });
  };
  document.querySelectorAll('[data-rail-prev]').forEach((b) =>
    b.addEventListener('click', () => scrollRail(b.dataset.railPrev, -1)));
  document.querySelectorAll('[data-rail-next]').forEach((b) =>
    b.addEventListener('click', () => scrollRail(b.dataset.railNext, 1)));

  const fetchJson = async (url) => {
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(`${url}: ${res.status}`);
    return res.json();
  };

  // --- Oferty (data/offers.json) ---
  const priceFmt = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 });

  const offerCard = (o) => {
    const card = el('article', 'bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col');
    const media = el('div', 'relative aspect-[16/10] bg-slate-200');
    if (o.image) {
      const img = el('img', 'w-full h-full object-cover');
      img.src = o.image;
      img.alt = o.title || '';
      img.loading = 'lazy';
      media.appendChild(img);
    }
    if (o.district) media.appendChild(el('span', 'absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-slate-800 text-xs font-semibold font-display', o.district));
    card.appendChild(media);

    const body = el('div', 'p-6 flex flex-col gap-3 flex-1');
    if (o.price) {
      const price = el('p', 'font-display font-bold text-2xl text-slate-900', priceFmt.format(o.price));
      if (o.mode === 'rent') price.textContent += ' / mies.';
      body.appendChild(price);
    }
    body.appendChild(el('h4', 'font-display font-semibold text-base text-slate-900', o.title || ''));

    const specs = el('ul', 'flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600');
    [['ruler', o.area && `${o.area} m²`], ['bed-double', o.rooms && `${o.rooms} pok.`], ['layers', o.floor && `piętro ${o.floor}`]]
      .filter(([, v]) => v)
      .forEach(([name, v]) => {
        const li = el('li', 'inline-flex items-center gap-1.5');
        li.append(icon(name, 'w-4 h-4 text-slate-500'), v);
        specs.appendChild(li);
      });
    body.appendChild(specs);

    if (o.url) {
      const portal = o.portal === 'morizon' ? 'Morizon' : 'Otodom';
      const link = el('a', 'mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-display text-xs uppercase tracking-wider font-semibold transition-colors');
      link.href = o.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.append(`Zobacz na ${portal}`, icon('external-link', 'w-4 h-4'));
      body.appendChild(link);
    }
    card.appendChild(body);
    return card;
  };

  const initOffers = async () => {
    const wrap = document.getElementById('offers');
    const rail = document.getElementById('offers-rail');
    if (!wrap || !rail) return;
    try {
      const offers = await fetchJson('/data/offers.json');
      if (!Array.isArray(offers) || offers.length === 0) return;
      offers.forEach((o) => rail.appendChild(offerCard(o)));
      wrap.classList.remove('hidden');
    } catch (err) {
      console.warn('Oferty niedostępne', err);
    }
  };

  // --- Opinie Google (funkcja Netlify, fallback data/reviews.json) ---
  const stars = (n) => {
    const row = el('div', 'flex text-amber-500');
    row.setAttribute('role', 'img');
    row.setAttribute('aria-label', `Ocena ${n} na 5`);
    for (let i = 0; i < 5; i += 1) row.appendChild(icon('star', `w-[18px] h-[18px] ${i < n ? 'fill-current' : 'text-slate-300'}`));
    return row;
  };

  const reviewCard = (r) => {
    const card = el('article', 'bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow');
    const top = el('div');
    const head = el('div', 'flex items-center justify-between mb-4');
    head.append(stars(Math.round(r.rating || 5)), el('span', 'text-xs text-slate-500 font-medium', 'Google'));
    top.appendChild(head);
    top.appendChild(el('p', 'text-slate-700 text-sm leading-relaxed mb-6 line-clamp-6', `„${r.text}”`));
    card.appendChild(top);

    const foot = el('div', 'pt-4 border-t border-slate-100 flex items-center gap-3');
    const initials = (r.author || '?').split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
    foot.appendChild(el('div', 'w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0', initials));
    const who = el('div');
    who.appendChild(el('span', 'font-display font-bold text-sm text-slate-900 block', r.author || 'Klient Google'));
    if (r.when) who.appendChild(el('span', 'text-xs text-slate-500', r.when));
    foot.appendChild(who);
    card.appendChild(foot);
    return card;
  };

  const initReviews = async () => {
    const rail = document.getElementById('reviews-rail');
    if (!rail) return;
    let data = null;
    for (const url of ['/api/reviews', '/data/reviews.json']) {
      try {
        data = await fetchJson(url);
        if (data && Array.isArray(data.reviews)) break;
      } catch (err) {
        console.warn('Opinie niedostępne', err);
      }
    }
    // Przykładowe opinie pokazujemy tylko lokalnie / w podglądzie
    const preview = ['localhost', '127.0.0.1'].includes(location.hostname) || location.search.includes('preview');
    const reviews = data && Array.isArray(data.reviews) && (!data.sample || preview) ? data.reviews : [];

    if (reviews.length === 0) {
      const empty = el('div', 'bg-white p-8 rounded-2xl border border-slate-200 text-sm text-slate-700', 'Opinie moich klientów znajdziesz w profilu Google.');
      rail.appendChild(empty);
      return;
    }
    reviews.forEach((r) => rail.appendChild(reviewCard(r)));

    if (data.rating && data.count) {
      const box = document.getElementById('reviews-summary');
      const text = document.getElementById('reviews-summary-text');
      if (box && text) {
        text.textContent = `Średnia ${String(data.rating).replace('.', ',')} · ${data.count} opinii w Google`;
        box.classList.remove('hidden');
        box.classList.add('flex');
      }
    }
  };

  // --- Animacje wejścia przy przewijaniu ---
  const initReveal = () => {
    const STAGGER_MS = 100;
    const targets = [];
    const mark = (node, index = 0) => {
      node.dataset.reveal = '';
      node.style.setProperty('--reveal-delay', `${Math.min(index, 5) * STAGGER_MS}ms`);
      targets.push(node);
    };
    const isGroup = (node) => node.matches('.grid, ol, ul');

    // Hero: elementy wjeżdżają kolejno zaraz po załadowaniu
    document.querySelectorAll('main > section:first-child .max-w-4xl > *').forEach((node, i) => mark(node, i));

    // Pozostałe sekcje: nagłówek jako całość, siatki kafelek po kolei
    document.querySelectorAll('main > section:not(:first-child)').forEach((section) => {
      const container = section.firstElementChild;
      if (!container) return;
      [...container.children].forEach((child) => {
        if (isGroup(child)) [...child.children].forEach((item, i) => mark(item, i));
        else mark(child);
      });
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((t) => observer.observe(t));
  };

  initReveal();
  initOffers();
  initReviews();
})();
