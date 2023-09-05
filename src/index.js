import L from 'leaflet';
import { updateMapAndFetchData}from './modules/searchPlace';
import { setupMapEvents } from './modules/weatherApi';
import "../dist/style.css"
// import { apiKey } from './apis';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  const mapElement = document.getElementById('map');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  const map = L.map(mapElement).setView([0, 0], 2);

 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);


  setupMapEvents(map);


  searchButton.addEventListener('click', () => {
    const location = searchInput.value;
    if (location) {
      updateMapAndFetchData(location, map);
    }
  });
});
