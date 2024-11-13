import * as THREE from 'three'
import { Suspense, useRef, useState } from "react";
import { DateTime } from 'luxon'
import { useInterval } from "usehooks-ts";
import { Center, Text3D } from '@react-three/drei';

import robotoFont from '../../assets/Roboto Mono_Regular.json?url'
import sourceCodeFont from '../../assets/Source Code Pro_Regular.json?url'

export function ClockWidget() {
  const [hm, setHM] = useState('')
  const [second, setSecond] = useState('')
  const [period, setPeriod] = useState('')

  useInterval(() => {
    const dt = DateTime.now()

    setHM(dt.toFormat('h:mm'))
    setSecond(dt.toLocaleString({ second: '2-digit' }))
    setPeriod(dt.toFormat('a'))
  }, 100)

  const ref = useRef(null)

  return (
    <Suspense fallback={null}>
      <group ref={ref}>
        <Center>
          <Text3D font={sourceCodeFont} size={10}>
            {hm}
            <meshStandardMaterial color="red" />
          </Text3D>
        </Center>
      </group>
    </Suspense>
  )
}
