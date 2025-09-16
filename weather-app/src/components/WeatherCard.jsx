import React from 'react'
import { useSelector } from 'react-redux'
// import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiNa } from "react-icons/wi";

// function mapIcon(main) {
//   const m = (main || "").toLowerCase();
//   if (m.includes("cloud")) return <WiCloudy size={56} />;
//   if (m.includes("rain")) return <WiRain size={56} />;
//   if (m.includes("snow")) return <WiSnow size={56} />;
//   if (m.includes("clear")) return <WiDaySunny size={56} />;
//   return <WiNa size={56} />;
// }

const WeatherCard = () => {
  const {
    loading,error,name,
    country,
    temp,
    humidity,
    wind,
    lat,
    lon,
    iconCode,
    description,
  } = useSelector((s) => s.weather);
  if(loading) return <div className='status'>Loading...</div>;
  if(error) return <div className='status'>❗{error}</div>;
  if(!name) return <div className='status'>Search a City to begin</div>
   const iconUrl =
    iconCode ?
    `https://openweathermap.org/img/wn/${iconCode}@2x.png` :
    null;
 return (
    <div className="card">
      <div className="card-head">
        <div className="place">
          <h2>{name}</h2>
          <span className="country">{country}</span>
        </div>
        <div className="icon-wrap">
          {iconUrl ? <img src={iconUrl} alt="icon" /> : mapIcon(description)}
        </div>
      </div>

      <div className="temp">{temp}°C</div>
      <div className="desc">{description || "—"}</div>

      <div className="grid">
        <div className="tile">
          <div className="label">Humidity</div>
          <div className="value">{humidity}%</div>
        </div>
        <div className="tile">
          <div className="label">Wind</div>
          <div className="value">{wind} km/h</div>
        </div>
        <div className="tile">
          <div className="label">Latitude</div>
          <div className="value">{lat}</div>
        </div>
        <div className="tile">
          <div className="label">Longitude</div>
          <div className="value">{lon}</div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard