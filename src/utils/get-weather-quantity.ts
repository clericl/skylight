import { WEATHER_INTENSITY } from "../constants"
import type { Weather } from "../types"

const INTENSITY_MAP: Record<keyof typeof WEATHER_INTENSITY, number> = {
  "very_light": 100,
  "heavy": 1000,
  "light": 200,
  "moderate": 500,
}

export function getWeatherQuantity(weather: Weather) {
  if (weather.intensity) {
    return INTENSITY_MAP[weather.intensity]
  }

  return null
}
