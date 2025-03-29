import * as THREE from 'three'
import { Cloud, Clouds as DreiClouds } from "@react-three/drei";
import { useMemo } from 'react';
import { useWeather } from '../../hooks';
import { getCloudOpacity } from '../../utils';

const CLOUD_COLOR = new THREE.Color(0x595959)

export function Clouds() {
  const weather = useWeather()

  const cloudOpacity = useMemo(() => {
    const weatherData = weather.data?.weather
    
    if (weatherData) {
      return getCloudOpacity(weatherData)
    }

    return 0
  }, [weather.data])

  return (
    <DreiClouds
      limit={200}
      material={THREE.MeshBasicMaterial}
      renderOrder={1}
      visible={!!cloudOpacity}
    >
      <Cloud
        bounds={[10, 2, 10]}
        color={CLOUD_COLOR}
        opacity={cloudOpacity}
        position={[0, 1, 0]}
        segments={100}
        scale={0.5}
        speed={0.1}
        volume={12}
      />
    </DreiClouds>
  )
}
