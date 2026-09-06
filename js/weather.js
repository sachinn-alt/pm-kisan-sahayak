// Real-time Weather Service using Open-Meteo Global Free API
// District coordinate database across major Indian farming belts
import { tablerIcon } from './icons.js';

export const DISTRICT_COORDINATES = {
  'Lucknow': { lat: 26.8467, lon: 80.9462, state: 'Uttar Pradesh' },
  'Patna': { lat: 25.5941, lon: 85.1376, state: 'Bihar' },
  'Jaipur': { lat: 26.9124, lon: 75.7873, state: 'Rajasthan' },
  'Bhopal': { lat: 23.2599, lon: 77.4126, state: 'Madhya Pradesh' },
  'Pune': { lat: 18.5204, lon: 73.8567, state: 'Maharashtra' },
  'Ludhiana': { lat: 30.9010, lon: 75.8573, state: 'Punjab' },
  'Ahmedabad': { lat: 23.0225, lon: 72.5714, state: 'Gujarat' },
  'Hyderabad': { lat: 17.3850, lon: 78.4867, state: 'Telangana' },
  'Varanasi': { lat: 25.3176, lon: 82.9739, state: 'Uttar Pradesh' },
  'Gorakhpur': { lat: 26.7606, lon: 83.3732, state: 'Uttar Pradesh' },
  'Muzaffarpur': { lat: 26.1209, lon: 85.3647, state: 'Bihar' },
  'Indore': { lat: 22.7196, lon: 75.8577, state: 'Madhya Pradesh' }
};

const DEFAULT_COORD = { lat: 26.8467, lon: 80.9462, district: 'Lucknow' };

export const WEATHER_CODES = {
  0: { labelEn: 'Clear Sky', labelHi: 'साफ आसमान', icon: 'sun', adviceHi: 'सिंचाई व छिड़काव के लिए उत्तम समय', adviceEn: 'Ideal for irrigation and spraying' },
  1: { labelEn: 'Mainly Clear', labelHi: 'हल्के बादल', icon: 'cloudSun', adviceHi: 'सामान्य कृषि कार्य जारी रखें', adviceEn: 'Normal farming activities recommended' },
  2: { labelEn: 'Partly Cloudy', labelHi: 'धूप-छांव', icon: 'cloudSun', adviceHi: 'मौसम अनुकूल, उर्वरक छिड़काव संभव', adviceEn: 'Favorable conditions for fertilization' },
  3: { labelEn: 'Overcast', labelHi: 'घने बादल', icon: 'cloud', adviceHi: 'वर्षा की संभावना, कीटनाशक रोकें', adviceEn: 'Overcast, pause pesticide spraying' },
  45: { labelEn: 'Foggy', labelHi: 'कोहरा', icon: 'cloud', adviceHi: 'फसलों में नमी की निगरानी रखें', adviceEn: 'Monitor moisture in vegetable crops' },
  48: { labelEn: 'Depositing Rime Fog', labelHi: 'घना कोहरा', icon: 'cloud', adviceHi: 'फफूंद रोग से बचाव के उपाय करें', adviceEn: 'Protect rabi crops from fungal issues' },
  51: { labelEn: 'Light Drizzle', labelHi: 'हल्की बूंदाबांदी', icon: 'cloudRain', adviceHi: 'खुली कटी फसल को ढककर रखें', adviceEn: 'Cover harvested grain in open yards' },
  53: { labelEn: 'Moderate Drizzle', labelHi: 'बूंदाबांदी', icon: 'cloudRain', adviceHi: 'सिंचाई रोकें, जलभराव न होने दें', adviceEn: 'Halt irrigation, ensure drainage' },
  55: { labelEn: 'Dense Drizzle', labelHi: 'घनी बूंदाबांदी', icon: 'cloudRain', adviceHi: 'खेतों से जल निकासी सुनिश्चित करें', adviceEn: 'Ensure proper farm water drainage' },
  61: { labelEn: 'Slight Rain', labelHi: 'हल्की बारिश', icon: 'cloudRain', adviceHi: 'प्राकृतिक नमी, सिंचाई की बचत होगी', adviceEn: 'Good soil moisture, save irrigation cost' },
  63: { labelEn: 'Moderate Rain', labelHi: 'मध्यम बारिश', icon: 'cloudRain', adviceHi: 'खेत में पानी जमा न होने दें', adviceEn: 'Prevent waterlogging in pulse crops' },
  65: { labelEn: 'Heavy Rain', labelHi: 'तेज बारिश', icon: 'cloudRain', adviceHi: 'अलर्ट: कटी फसल व अनाज सुरक्षित रखें', adviceEn: 'Alert: Move harvested produce indoors' },
  80: { labelEn: 'Rain Showers', labelHi: 'रुक-रुक कर बारिश', icon: 'cloudRain', adviceHi: 'मौसम बदलने तक कटाई रोकें', adviceEn: 'Postpone harvesting until rain stops' },
  95: { labelEn: 'Thunderstorm', labelHi: 'आंधी-तूफान', icon: 'cloudRain', adviceHi: 'सावधानी: खुले खेतों और पेड़ों से दूर रहें', adviceEn: 'Warning: Stay away from open fields & trees' }
};

// In-memory cache & fallback
let weatherCache = {};

export async function fetchLiveWeather(districtName = 'Lucknow') {
  const coord = DISTRICT_COORDINATES[districtName] || DEFAULT_COORD;
  const cacheKey = `weather_${districtName}`;

  // Check memory or localStorage cache (15 min cache)
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < 15 * 60 * 1000) {
        weatherCache[districtName] = parsed.data;
        return parsed.data;
      }
    }
  } catch (e) {
    // ignore local storage error
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coord.lat}&longitude=${coord.lon}&current=temperature_2m,relative_humidity_2m,weather_code,precipitation,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
    const json = await res.json();

    const current = json.current || {};
    const daily = json.daily || {};
    const code = current.weather_code ?? 0;
    const meta = WEATHER_CODES[code] || WEATHER_CODES[0];

    const weatherData = {
      district: districtName,
      temp: Math.round(current.temperature_2m ?? 28),
      tempMax: Math.round(daily.temperature_2m_max?.[0] ?? 32),
      tempMin: Math.round(daily.temperature_2m_min?.[0] ?? 22),
      humidity: Math.round(current.relative_humidity_2m ?? 65),
      windSpeed: Math.round(current.wind_speed_10m ?? 8),
      rainChance: daily.precipitation_probability_max?.[0] ?? 10,
      code: code,
      icon: meta.icon,
      conditionEn: meta.labelEn,
      conditionHi: meta.labelHi,
      adviceHi: meta.adviceHi,
      adviceEn: meta.adviceEn,
      isLive: true,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    try {
      localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: weatherData }));
    } catch (e) {}

    weatherCache[districtName] = weatherData;
    return weatherData;
  } catch (err) {
    console.warn('Using offline weather fallback for', districtName, err);
    const fallbackData = {
      district: districtName,
      temp: 29,
      tempMax: 33,
      tempMin: 23,
      humidity: 62,
      windSpeed: 9,
      rainChance: 15,
      code: 1,
      icon: 'cloudSun',
      conditionEn: 'Mainly Clear',
      conditionHi: 'हल्के बादल',
      adviceHi: 'मौसम अनुकूल: फसल सिंचाई व सामान्य कार्य जारी रखें',
      adviceEn: 'Favorable weather: Continue regular farm activities',
      isLive: false,
      lastUpdated: 'Offline'
    };
    weatherCache[districtName] = fallbackData;
    return fallbackData;
  }
}

export const fetchDistrictWeather = fetchLiveWeather;

export function getCachedWeather(districtName = 'Lucknow') {
  return weatherCache[districtName] || {
    district: districtName,
    temp: 29,
    humidity: 62,
    rainChance: 15,
    icon: 'sun',
    conditionHi: 'साफ मौसम',
    conditionEn: 'Clear Sky',
    adviceHi: 'मौसम अनुकूल है',
    isLive: false
  };
}

export function renderWeatherBadge(weather, lang = 'hi') {
  const data = weather || {
    temp: 29,
    rainChance: 10,
    humidity: 62,
    icon: 'sun',
    conditionHi: 'साफ मौसम',
    conditionEn: 'Clear Sky',
    isLive: true
  };

  const iconName = data.icon || 'sun';
  const condition = lang === 'hi' ? (data.conditionHi || 'साफ मौसम') : (data.conditionEn || 'Clear');

  return `
    <div class="weather-badge-widget" title="Live Weather & Agro-Advisory" aria-label="Live Weather">
      <div class="weather-top-row">
        <span class="weather-icon-box">
          ${tablerIcon(iconName, 22, 'weather-anim-icon')}
        </span>
        <span class="weather-temp">${data.temp}°C</span>
      </div>
      <div class="weather-bottom-row">
        <span class="weather-desc">${condition}</span>
        <span class="weather-rain-pill" title="Rain probability">
          ${tablerIcon('droplet', 11)} ${data.rainChance ?? 10}%
        </span>
      </div>
    </div>
  `;
}
