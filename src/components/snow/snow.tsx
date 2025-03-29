import * as THREE from 'three'
import { getWeatherCategory, getWeatherQuantity } from '../../utils'
import { useMemo } from 'react'
import { useSnow, useWeather } from '../../hooks'
import { useTexture } from '@react-three/drei'
import { WeatherCategory } from '../../constants'

const assignSRGB = (texture: THREE.Texture) => {
  texture.colorSpace = THREE.SRGBColorSpace
}

export function Snow() {
  const tex1 = useTexture('snowflake1.png', assignSRGB)
  const tex2 = useTexture('snowflake2.png', assignSRGB)
  const tex3 = useTexture('snowflake3.png', assignSRGB)
  const tex4 = useTexture('snowflake4.png', assignSRGB)
  const tex5 = useTexture('snowflake5.png', assignSRGB)

  const weather = useWeather()

  const snowAmount = useMemo(() => {
    const weatherData = weather.data?.weather
    
    if (weatherData) {
      const category = getWeatherCategory(weatherData)

      if (category === WeatherCategory.SNOW) {
        return getWeatherQuantity(weatherData)
      }
    }

    return 0
  }, [weather.data])

  const mesh1 = useSnow(snowAmount, tex1)
  const mesh2 = useSnow(snowAmount, tex2)
  const mesh3 = useSnow(snowAmount, tex3)
  const mesh4 = useSnow(snowAmount, tex4)
  const mesh5 = useSnow(snowAmount, tex5)

  return (
    <group>
      <primitive object={mesh1} />
      <primitive object={mesh2} />
      <primitive object={mesh3} />
      <primitive object={mesh4} />
      <primitive object={mesh5} />
    </group>
  )
}
