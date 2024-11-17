import { useQuery } from "@tanstack/react-query";
import { weatherQueryKey } from "../constants/";
import { useEffect, useState } from "react";
import { geolocate } from "../utils";

const BASE_URL = 'https://api.weather.gov/points/'

function constructUrl(latitude: number, longitude: number) {
  return BASE_URL + latitude + ',' + longitude
}

async function getForecastUrl() {
  if (!navigator.geolocation) {
    console.warn('Geolocation was unsuccessful')

    return null
  }

  try {
    const position = await geolocate()
    const res = await fetch(constructUrl(position.coords.latitude, position.coords.longitude))
    const data = await res.json()

    return data?.properties?.forecast
  } catch (err) {
    console.warn(err)

    return null
  }
}

async function getWeather(forecastUrl: string) {
  if (!navigator.geolocation || !forecastUrl) {
    console.warn('Geolocation was unsuccessful')

    return null
  }

  try {
    const res = await fetch(forecastUrl)
    const data = await res.json()

    return data?.properties?.periods?.[0]
  } catch (err) {
    console.warn(err)

    return null
  }
}

export function useWeather() {
  const [forecastUrl, setForecastUrl] = useState('')

  useEffect(() => {
    const fetchUrl = async () => {
      const url = await getForecastUrl()

      if (url) {
        setForecastUrl(url)
      }
    }

    fetchUrl()
  }, [])

  return useQuery({
    queryKey: weatherQueryKey,
    queryFn: () => getWeather(forecastUrl),
    refetchInterval: 1000,
  })
}
