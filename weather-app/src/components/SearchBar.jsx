import React, { useEffect,useState } from 'react'
import {useDispatch} from 'react-redux'
import useDebounce from "../utils/useDebounce";
import { fetchWeather } from '../slice/weatherSlice'

const SearchBar = () => {
  const dispatch = useDispatch();
  const [city,setCity] = useState(localStorage.getItem("lastCity") || "");
  const debouncedCity = useDebounce(city,600);
  useEffect(() => {
    if(debouncedCity?.trim()) {
      dispatch(fetchWeather(debouncedCity.trim()));
    }
  },[debouncedCity,dispatch]);
  return (
    <div className='searchBar'>
      <input type="text" className='input' value={city}
       onChange={(e) => setCity(e.target.value) }
       onKeyDown={(e) => {
        if(e.key === "Enter" && city.trim()){
          dispatch(fetchWeather(city.trim()));
        } } } />
      <button className='btn' onClick={() => city.trim() 
        && dispatch(fetchWeather(city.trim()))}>Search</button>
    </div>
  )
}

export default SearchBar