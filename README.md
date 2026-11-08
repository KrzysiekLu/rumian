# Strona Marcina Rumianowskiego

Statyczna strona (Tailwind + zwykły JS) hostowana na Netlify.

## Praca lokalna
- `npm install`
- `npm run build` buduje stronę do `dist/`

## Gdzie co zmieniać
- `src/site.json` — telefon, e-mail, adres, linki do profili Otodom/Morizon/Google, dane administratora do polityki prywatności, adres domeny (`siteUrl`).
- `src/data/offers.json` — karuzela ofert. Pusta lista = karuzela ukryta. Przykład wpisu:
  ```json
  { "title": "Jasne 3 pokoje przy parku", "district": "Mokotów", "price": 1250000, "area": 62, "rooms": 3, "floor": 4,
    "image": "/img/oferty/mokotow-1.jpg", "url": "https://www.otodom.pl/...", "portal": "otodom" }
  ```
  Dla wynajmu dodaj `"mode": "rent"`. Zdjęcia wrzucaj do `src/img/oferty/`.
- `src/data/reviews.json` — opinie zapasowe. Plik z `"sample": true` jest ignorowany na produkcji.
- `src/img/marcin.jpg` — zdjęcie Marcina (4:5), pojawi się w sekcji „O mnie".
- Teksty — `src/index.html` (miejsca do potwierdzenia oznaczone `TODO`).

## Opinie Google (Netlify)
Site settings → Environment variables:
- `GOOGLE_PLACES_API_KEY` — klucz Google Cloud z włączonym „Places API (New)"
- `GOOGLE_PLACE_ID` — identyfikator miejsca profilu firmy

Funkcja `netlify/functions/reviews.mjs` zwraca do 5 opinii (limit Google) i jest cache'owana.

## Wdrożenie
Połącz repozytorium z Netlify (build: `npm run build`, publish: `dist`) albo wgraj folder `dist`.
