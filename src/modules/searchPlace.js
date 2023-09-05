import L from 'leaflet';
import { geoApikey, apiKey } from './apis';
import weatherAPiFetch from './weatherApi'; 

export async function updateMapAndFetchData(location, map) {
    const geocodingApiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${geoApikey}`;

    try {
        const response = await fetch(geocodingApiUrl);
        const geocodingData = await response.json();

        if (geocodingData.results && geocodingData.results.length > 0) {
            const latitude = geocodingData.results[0].geometry.lat;
            const longitude = geocodingData.results[0].geometry.lng;

            
            map.setView([latitude, longitude], 10);

            
            const marker = L.marker([latitude, longitude]).addTo(map);
            
            
            const weatherData = await weatherAPiFetch(latitude, longitude, apiKey);

            
            if (weatherData) {
               
                console.log(weatherData);
            }
        } else {
            console.error('Location not found.');
        }
    } catch (error) {
        console.error('Error fetching location data:', error);
    }
}
