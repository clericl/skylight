import starfieldCsv from '../assets/stardata.csv?raw'
import * as d3 from 'd3-dsv'
import * as THREE from 'three'
import type { Point, Star } from '../types'
import { calcStarPosition } from '../utils/calc-star-position'
import { getLmst } from '../utils/get-lmst'
import { DEFAULT_COORDINATES } from '../constants'
import { useMemo } from 'react'

const data = d3.csvParse(starfieldCsv) as Star[]
const calcMatrix = new THREE.Matrix4()
const calcColor = new THREE.Color()
const geometry = new THREE.SphereGeometry(0.001)
const material = new THREE.MeshBasicMaterial({ toneMapped: false })
const starfieldMesh = new THREE.InstancedMesh(
  geometry,
  material,
  data.length
)

export function useStarfield(localPosition: Point = DEFAULT_COORDINATES) {
  const mesh = useMemo(() => {
    const lmst = getLmst(localPosition)
  
    for (let i = 0; i < data.length; i++) {
      const datum = data[i]
  
      const starPosition = calcStarPosition(datum, lmst, localPosition)
  
      calcMatrix.setPosition(starPosition.x, starPosition.y, starPosition.z)
      starfieldMesh.setMatrixAt(i, calcMatrix)
  
      const expMag = Math.pow(100, ((5 - Number(datum.mag)) / 5)) * 0.01
  
      starfieldMesh.setColorAt(i, calcColor.setRGB(expMag * 1.1, expMag * 1.1, expMag))
    }
  
    return starfieldMesh
  }, [localPosition])

  return {
    mesh,
  }
}
