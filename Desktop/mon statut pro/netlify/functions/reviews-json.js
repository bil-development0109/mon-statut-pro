const { getStore } = require('@netlify/blobs');

const defaultReviews = [
  { name: 'Alice', review: 'Service réactif et très clair pour mon statut d’auto‑entrepreneur.', date: '2024-10-01T12:00:00.000Z' },
  { name: 'Marc', review: 'Très bon conseil pour choisir entre SASU et micro‑entreprise.', date: '2024-10-05T09:30:00.000Z' }
];

exports.handler = async () => {
  try {
    let items = defaultReviews;
    try {
      const store = getStore('reviews');
      const fromBlob = await store.get('reviews.json', { type: 'json' });
      if (Array.isArray(fromBlob)) {
        items = fromBlob;
      }
    } catch (inner) {
      // Si l’accès aux blobs échoue (non activé ou indisponible), on retourne les avis par défaut sans erreur.
      items = defaultReviews;
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify(items),
    };
  } catch (err) {
    // Dernier filet de sécurité
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify(defaultReviews),
    };
  }
};