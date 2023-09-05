import { apiKey } from './apis';


export function setupMapEvents(map) {
    
    map.on('click', async (e) => {
     
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;
  
     
      const weatherData = await weatherAPiFetch(lat, lon, apiKey);
  
  
      const popupContent = createPopupContent(weatherData);
  
    
      const popup = L.popup()
        .setLatLng(e.latlng)
        .setContent(popupContent)
        .openOn(map);
    });
  }
  
 
  function createPopupContent(weatherData) {
    const {temp, dewpt, wind_spd, weather,precip } = weatherData.data[0]; 
  
    return `
      <div>
        <h3>Weather Information</h3>
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${dewpt}%</p>
        <p>Wind Speed: ${wind_spd} m/s</p>
        <p>Weather: ${weather.description}</p>
        <p>Precipitation: ${precip}</p>

      </div>
    `;
  }
  

async function weatherAPiFetch(lat, lon, apiKey) {


  const apiUrl = `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&key=${apiKey}&include=minutely`;

  try {
    const response = await fetch(apiUrl, { mode: 'cors' });
    const data = await response.json();


    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching climate information:', error);
    return 'Climate information not available.';
  }
}

export default weatherAPiFetch;
