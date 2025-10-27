const { getStore } = require('@netlify/blobs');

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { ...corsHeaders } };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { ...jsonHeaders, ...corsHeaders }, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { name, review } = JSON.parse(event.body || '{}');
    const n = String(name || '').trim();
    const r = String(review || '').trim();

    if (!n || !r) {
      return { statusCode: 400, headers: { ...jsonHeaders, ...corsHeaders }, body: JSON.stringify({ error: 'Nom et avis sont requis.' }) };
    }
    if (n.length > 120 || r.length > 2000) {
      return { statusCode: 400, headers: { ...jsonHeaders, ...corsHeaders }, body: JSON.stringify({ error: 'Taille maximale dépassée.' }) };
    }

    const newItem = {
      name: n,
      review: r,
      date: new Date().toISOString(),
    };

    try {
      // Tentative d'écriture dans Netlify Blobs
      const store = getStore('reviews');
      let items = await store.get('reviews.json', { type: 'json' });
      if (!Array.isArray(items)) items = [];
      items.push(newItem);
      await store.set('reviews.json', items, { type: 'json' });

      return {
        statusCode: 200,
        headers: { ...jsonHeaders, ...corsHeaders },
        body: JSON.stringify({ ok: true, added: newItem, count: items.length, stored: true }),
      };
    } catch (blobError) {
      // Si Blobs n'est pas disponible, on simule un succès
      // L'avis ne sera pas persisté mais l'utilisateur n'aura pas d'erreur
      return {
        statusCode: 200,
        headers: { ...jsonHeaders, ...corsHeaders },
        body: JSON.stringify({ 
          ok: true, 
          added: newItem, 
          count: 1, 
          stored: false,
          message: 'Avis reçu (stockage temporairement indisponible)'
        }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: { ...jsonHeaders, ...corsHeaders },
      body: JSON.stringify({ error: "Impossible d'ajouter l'avis", details: err.message }),
    };
  }
};