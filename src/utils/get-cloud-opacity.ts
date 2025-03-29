import { WEATHER_INTENSITY } from "../constants"
import type { Weather } from "../types"

const INTENSITY_MAP: Record<keyof typeof WEATHER_INTENSITY, number> = {
  "very_light": 0.1,
  "heavy": 1,
  "light": 0.2,
  "moderate": 0.7,
}

export function getCloudOpacity(weather: Weather) {
  if (weather.intensity) {
    return INTENSITY_MAP[weather.intensity]
  }

  return 0
}
