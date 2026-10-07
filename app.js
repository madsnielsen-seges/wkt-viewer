const map = L.map('map').setView([56.17, 9.97], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const input = document.getElementById('wkt');
const status = document.getElementById('status');
let geometryLayer;

function getWktFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('wkt') || '';
}

function renderWkt(wkt, updateUrl = true) {
  status.textContent = '';
  if (!wkt.trim()) {
    status.textContent = 'Angiv en WKT-geometri.';
    return;
  }

  try {
    const geojson = Terraformer.WKT.parse(wkt.trim());
    if (geometryLayer) map.removeLayer(geometryLayer);
    geometryLayer = L.geoJSON(geojson, {
      style: { color: '#b42318', weight: 3, fillColor: '#62b77b', fillOpacity: 0.35 },
      pointToLayer: (_, latlng) => L.circleMarker(latlng, { radius: 7, color: '#b42318', fillOpacity: .7 })
    }).addTo(map);

    const bounds = geometryLayer.getBounds();
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [30, 30], maxZoom: 18 });

    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('wkt', wkt.trim());
      history.replaceState(null, '', url);
    }
    status.style.color = '#176b3a';
    status.textContent = 'Geometrien er vist.';
  } catch (error) {
    status.style.color = '#a1260d';
    status.textContent = `WKT kunne ikke læses: ${error.message}`;
  }
}

document.getElementById('show').addEventListener('click', () => renderWkt(input.value));
document.getElementById('copy').addEventListener('click', async () => {
  renderWkt(input.value);
  try {
    await navigator.clipboard.writeText(window.location.href);
    status.style.color = '#176b3a';
    status.textContent = 'Delelink kopieret.';
  } catch {
    status.style.color = '#a1260d';
    status.textContent = 'Kunne ikke kopiere automatisk. Kopiér URL’en fra adresselinjen.';
  }
});

const initialWkt = getWktFromUrl();
if (initialWkt) {
  input.value = initialWkt;
  renderWkt(initialWkt, false);
}
