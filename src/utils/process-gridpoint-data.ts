import type { Gridpoint, ProcessedGridpointData, TemperatureUnit } from "../types";

export function processGridpointData(gridpoint: Gridpoint): ProcessedGridpointData {
  let temperatureUnit = gridpoint.temperature?.uom
  let temperature = gridpoint.temperature?.values[0].value

  const weather = gridpoint.weather?.values[1].value[0].weather
  const weatherCoverage = gridpoint.weather?.values[1].value[0].coverage
  const weatherIntensity = gridpoint.weather?.values[1].value[0].intensity

  if (temperatureUnit === 'wmoUnit:degC' && typeof temperature === 'number') {
    temperature = Math.round((temperature * 9 / 5) + 32)
    temperatureUnit = 'f'
  }

  return {
    temperature: {
      unit: (temperatureUnit ?? null) as TemperatureUnit,
      value: temperature ?? null,
    },
    weather: {
      type: weather ?? null,
      coverage: weatherCoverage ?? null,
      intensity: weatherIntensity ?? null,
    },
  }
}
