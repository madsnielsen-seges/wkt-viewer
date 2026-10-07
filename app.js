const map=L.map('map').setView([56.17,9.97],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(map);
const input=document.getElementById('wkt');
const status=document.getElementById('status');
let layer;
function draw(wkt){
 try{
  const geojson=wellknown.parse(wkt);
  if(layer) map.removeLayer(layer);
  layer=L.geoJSON(geojson,{style:{color:'red'}}).addTo(map);
  map.fitBounds(layer.getBounds());
  status.textContent='OK';
 }catch(e){status.textContent=e.message;}
}
const urlWkt=new URLSearchParams(location.search).get('wkt');
if(urlWkt){input.value=urlWkt;draw(urlWkt);} 
document.getElementById('show').onclick=()=>draw(input.value);
