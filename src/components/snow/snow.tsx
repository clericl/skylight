import { getWeatherCategory, getWeatherQuantity } from '../../utils'
import { useMemo } from 'react'
import { useSnow, useWeather } from '../../hooks'
import { WeatherCategory } from '../../constants'

export function Snow() {
  const weather = useWeather()

  const snowAmount = useMemo(() => {
    const weatherData = weather.data?.weather
    
    if (weatherData) {
      const category = getWeatherCategory(weatherData)

      if (category !== WeatherCategory.SNOW) return null

      return getWeatherQuantity(weatherData)
    }

    return null
  }, [weather.data])

  const snowMesh = useSnow(100)

  return snowMesh && (
    <primitive object={snowMesh} />
  )
}
