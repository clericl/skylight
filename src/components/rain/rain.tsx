import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef, useState } from "react";
import { RainMaterial } from "../../materials";
import { Billboard, ScreenSizer, useTexture } from '@react-three/drei';
import { useWeather } from '../../hooks';
import blueTex from '../../assets/blue.jpg'

export function Rain() {
  const [rainMaterial] = useState(new RainMaterial())
  const ref = useRef<THREE.Mesh>(null!)
  const tex = useTexture(blueTex)
  const weather = useWeather()
  const isRaining = (weather.data?.probabilityOfPrecipitation.value ?? 0) > 50

  useFrame((state) => {
    (ref.current.material as RainMaterial).uniforms.iTime.value = state.clock.elapsedTime
  })

  useLayoutEffect(() => {
    (ref.current.material as RainMaterial).uniforms.iResolution.value = new THREE.Vector2(document.body.clientWidth, document.body.clientHeight);
    (ref.current.material as RainMaterial).uniforms.iChannel0.value = tex;
  }, [tex])

  return isRaining ? (
    <ScreenSizer>
      <Billboard>
        <mesh ref={ref}>
          <planeGeometry args={[document.body.clientWidth, document.body.clientHeight]} />
          <primitive attach="material" object={rainMaterial} side={THREE.DoubleSide} transparent blending={THREE.NormalBlending} />
        </mesh>
      </Billboard>
    </ScreenSizer>
  ) : null
}
