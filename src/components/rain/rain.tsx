import { getWeatherCategory, getWeatherQuantity } from '../../utils'
import { useMemo } from 'react'
import { useRain, useWeather } from '../../hooks'
import { WeatherCategory } from '../../constants'

export function Rain() {
  const weather = useWeather()

  const rainAmount = useMemo(() => {
    const weatherData = weather.data?.weather
    
    if (weatherData) {
      const category = getWeatherCategory(weatherData)

      if (category !== WeatherCategory.RAIN) return null

      return getWeatherQuantity(weatherData)
    }

    return null
  }, [weather.data])

  const rainMesh = useRain(rainAmount)

  return rainMesh && (
    <primitive object={rainMesh} />
  )
}
