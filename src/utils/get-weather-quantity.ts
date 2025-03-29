import { WEATHER_COVERAGE, WEATHER_INTENSITY } from "../constants"
import type { Weather } from "../types"

const INTENSITY_MAP: Record<keyof typeof WEATHER_INTENSITY, number> = {
  "very_light": 100,
  "heavy": 1000,
  "light": 200,
  "moderate": 500,
}

const COVERAGE_MAP: Record<keyof typeof WEATHER_COVERAGE, number> = {
  "areas": 0.8,
  "brief": 0.1,
  "chance": 0.2,
  "definite": 1,
  "few": 0.1,
  "frequent": 1.2,
  "intermittent": 0.4,
  "isolated": 0.2,
  "likely": 0.8,
  "numerous": 1.2,
  "occasional": 0.3,
  "patchy": 0.3,
  "periods": 0.4,
  "scattered": 0.2,
  "slight_chance": 0.1,
  "widespread": 1.1,
}

export function getWeatherQuantity(weather: Weather) {
  let base = 0
  let multiplier = 1

  if (weather.intensity) {
    base = INTENSITY_MAP[weather.intensity]
  }

  if (weather.coverage) {
    multiplier = COVERAGE_MAP[weather.coverage]
  }

  return base ? (base * multiplier) : base
}
