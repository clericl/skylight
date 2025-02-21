import { WeatherCategory } from "../constants"
import { Weather } from "../types"

const WEATHER_CATEGORY_MAP = {
  "blowing_dust": null,
  "blowing_sand": null,
  "blowing_snow": WeatherCategory.SNOW,
  "drizzle": WeatherCategory.RAIN,
  "fog": WeatherCategory.FOG,
  "freezing_fog": WeatherCategory.FOG,
  "freezing_drizzle": WeatherCategory.RAIN,
  "freezing_rain": WeatherCategory.RAIN,
  "freezing_spray": null,
  "frost": null,
  "hail": WeatherCategory.HAIL,
  "haze": WeatherCategory.FOG,
  "ice_crystals": null,
  "ice_fog": WeatherCategory.FOG,
  "rain": WeatherCategory.RAIN,
  "rain_showers": WeatherCategory.RAIN,
  "sleet": WeatherCategory.RAIN,
  "smoke": WeatherCategory.FOG,
  "snow": WeatherCategory.SNOW,
  "snow_showers": WeatherCategory.SNOW,
  "thunderstorms": WeatherCategory.RAIN,
  "volcanic_ash": null,
  "water_spouts": null,
}

export function getWeatherCategory(weather: Weather) {
  if (weather.type) {
    return WEATHER_CATEGORY_MAP[weather.type] ?? null
  }

  return null
}
