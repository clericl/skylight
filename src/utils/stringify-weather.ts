import { Weather } from "../types";
import { WEATHER_COVERAGE, WEATHER_INTENSITY } from "../constants";

export function stringifyWeather(weather: Weather): string | null {
  let returnString = ''

  if (weather.coverage) {
    const stringifiedCoverage = WEATHER_COVERAGE[weather.coverage] ?? weather.coverage

    if (stringifiedCoverage) {
      returnString += (stringifiedCoverage + ' ')
    }
  }

  if (weather.intensity) {
    const stringifiedIntensity = WEATHER_INTENSITY[weather.intensity] ?? weather.intensity

    if (stringifiedIntensity) {
      returnString += (stringifiedIntensity + ' ')
    }
  }

  if (weather.type) {
    const stringifiedType = weather.type.replace('_', ' ')

    if (stringifiedType) {
      returnString += stringifiedType
    }
  }

  return returnString || null
}
