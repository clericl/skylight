import * as THREE from 'three'
import { Cloud, Clouds as DreiClouds } from "@react-three/drei";
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useWeather } from '../../hooks';
import { getWeatherCategory } from '../../utils';

const CONTRAST_COLOR = new THREE.Color(0x303030)
const CLOUD_COLOR = new THREE.Color(0x595959)

export function Clouds() {
  const weather = useWeather()

  const cloudsRef = useRef<THREE.Group>(null)
  const materialUpdated = useRef<boolean>(false)

  const shouldRender = useMemo(() => {
    const weatherData = weather.data?.weather
    console.log(weatherData)

    if (weatherData) {
      const category = getWeatherCategory(weatherData)

      if (category) {
        return true
      }
    }

    return false
  }, [weather.data])
  
  useFrame(() => {
    if (!materialUpdated.current && cloudsRef.current) {
      cloudsRef.current.renderOrder = 1
      materialUpdated.current = true
    }
  })

  return (
    <DreiClouds
      frustumCulled={false}
      limit={1200}
      material={THREE.MeshBasicMaterial}
      ref={cloudsRef}
      visible={shouldRender}
    >
      <Cloud
        bounds={[10, 2, 10]}
        color={CONTRAST_COLOR}
        concentrate="outside"
        segments={600}
        scale={0.1}
        speed={0.2}
        position={[0, 0.25, 0]}
        visible={shouldRender}
        />
      <Cloud
        bounds={[10, 2, 10]}
        color={CLOUD_COLOR}
        concentrate="inside"
        segments={600}
        scale={0.1}
        speed={0.2}
        visible={shouldRender}
      />
    </DreiClouds>
  )
}
