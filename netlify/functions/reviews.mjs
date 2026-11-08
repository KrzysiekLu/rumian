// Opinie z Google (Places API New). Klucz zostaje po stronie serwera.
// Zmienne środowiskowe w Netlify: GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID

export default async () => {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return json({ error: 'not_configured' }, 503);

  const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=pl`, {
    headers: {
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
    },
  });
  if (!res.ok) return json({ error: 'upstream_error', status: res.status }, 502);

  const place = await res.json();
  const reviews = (place.reviews ?? [])
    .map((r) => ({
      author: r.authorAttribution?.displayName ?? '',
      rating: r.rating ?? 5,
      when: r.relativePublishTimeDescription ?? '',
      text: (r.originalText?.text ?? r.text?.text ?? '').trim(),
    }))
    .filter((r) => r.text);

  return json({ rating: place.rating ?? null, count: place.userRatingCount ?? null, reviews }, 200, 'public, max-age=3600, s-maxage=86400');
};

function json(body, status = 200, cache = 'no-store') {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': cache },
  });
}

export const config = { path: '/api/reviews' };
