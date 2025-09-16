// Simple cache using localStorage (5 minutes)
const CACHE_MINUTES = 5;

const getCacheKey = (city) => `weather_${city.toLowerCase()}`;
const isFresh = (timestamp) => Date.now() - timestamp < CACHE_MINUTES * 60 * 1000;

export async function getWeatherByCity(city) {
  if (!city) return { error: "Please enter a city" };

 const apiKey = import.meta.env.VITE_WEATHER_API_KEY;// CRA: process.env.REACT_APP_WEATHER_API_KEY
  if (!apiKey) return { error: "Missing API key" };

  // 1) Try cache
  const cacheKey = getCacheKey(city);
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (isFresh(parsed.timestamp)) return parsed.data;
  }

  // 2) Fetch from API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok || data.cod === "404" || data.cod === 404) {
      return { error: data.message || "City not found" };
    }

    // 3) Save cache + lastCity
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ timestamp: Date.now(), data })
    );
    localStorage.setItem("lastCity", city);

    return data;
  } catch (e) {
    return { error: "Network error. Please try again." };
  }
}

