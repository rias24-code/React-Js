import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeatherByCity } from '../services/weatherService';

const initialCity = localStorage.getItem("lastCity") || "Madurai";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const data = await getWeatherByCity(city);
      if (data.error) return rejectWithValue(data.error);
      return { city, data };
    } catch (e) {
      return rejectWithValue(e.message || "Failed to fetch weather");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    loading: false,
    error: null,
    // normalized subset of API response
    name: "",
    country: "",
    temp: null,
    humidity: null,
    wind: null,
    lat: null,
    lon: null,
    iconCode: "",
    description: "",
    lastCity: initialCity,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const { data, city } = action.payload;
        state.loading = false;
        state.error = null;

        state.name = data.name;
        state.country = data.sys?.country || "";
        state.temp = Math.round(data.main?.temp ?? 0);
        state.humidity = data.main?.humidity ?? 0;
        state.wind = data.wind?.speed ?? 0;
        state.lat = data.coord?.lat ?? 0;
        state.lon = data.coord?.lon ?? 0;
        state.iconCode = data.weather?.[0]?.icon || "";
        state.description = data.weather?.[0]?.description || "";
        state.lastCity = city;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default weatherSlice.reducer;