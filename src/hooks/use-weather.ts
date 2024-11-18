import { useQuery } from "@tanstack/react-query";
import { weatherQueryKey } from "../constants/";
import { useLocation } from "./use-location";
import type { Point } from "../types";

const BASE_URL = 'https://api.weather.gov/points/'

function constructUrl(latitude: number, longitude: number) {
  return BASE_URL + latitude + ',' + longitude
}

async function getForecastUrl(position: Point) {
  try {
    const res = await fetch(constructUrl(position.latitude, position.longitude))
    const data = await res.json()

    return data?.properties?.forecast
  } catch (err) {
    console.warn(err)

    return null
  }
}

async function getWeather(location: Point) {
  const forecastUrl = await getForecastUrl(location)

  try {
    const res = await fetch(forecastUrl)
    const data = await res.json()

    return data?.properties?.periods?.[0]
  } catch (err) {
    console.warn(err)
  }

  return null
}

export function useWeather() {
  const location = useLocation()

  return useQuery({
    queryKey: [
      ...weatherQueryKey,
      location.data,
    ],
    queryFn: () => getWeather(location.data!),
    refetchInterval: 1000,
    enabled: !!location.data,
  })
}
