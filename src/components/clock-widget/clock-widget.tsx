import * as THREE from 'three'
import { Suspense, useCallback, useLayoutEffect, useRef, useState } from "react";
import { DateTime } from 'luxon'
import { useInterval } from "usehooks-ts";
import { Center, OnCenterCallbackProps, Text3D } from '@react-three/drei';

import robotoFont from '../../assets/Roboto Mono_Regular.json?url'
import sourceCodeFont from '../../assets/Source Code Pro_Regular.json?url'
import { useFrame, useThree } from '@react-three/fiber';

export function ClockWidget() {
  const [hm, setHM] = useState('')
  const [second, setSecond] = useState('')
  const [period, setPeriod] = useState('')
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useInterval(() => {
    const dt = DateTime.now()

    setHM(dt.toFormat('h:mm'))
    setSecond(dt.toLocaleString({ second: '2-digit' }))
    setPeriod(dt.toFormat('a'))
  }, 100)

  const ref = useRef(null)
  const hmRef = useRef(null)

  useFrame(() => {
    if (hmRef.current) {
      console.log(hmRef.current)
    }
  })

  return (
    <Suspense fallback={null}>
      <Center ref={ref}>
        <group ref={hmRef}>
            <Text3D font={sourceCodeFont} size={10}>
              {hm}
              <meshStandardMaterial color="red" />
            </Text3D>
            <Center top right>
              <Text3D font={sourceCodeFont} size={5}>
                {second}
                <meshStandardMaterial color="red" />
              </Text3D>
            </Center>
            <Center bottom right>
              <Text3D font={sourceCodeFont} size={5}>
                {period}
                <meshStandardMaterial color="red" />
              </Text3D>
            </Center>
        </group>
      </Center>
    </Suspense>
  )
}
