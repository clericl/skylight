import starfieldCsv from '../assets/stardata.csv?raw'
import * as d3 from 'd3-dsv'
import * as THREE from 'three'
import type { Point, Star } from '../types'
import { calcStarColor, calcStarPosition } from '../utils'
import { getLmst } from '../utils/get-lmst'
import { DEFAULT_COORDINATES } from '../constants'
import { useCallback, useMemo } from 'react'
import { useInterval } from 'usehooks-ts'

const data = d3.csvParse(starfieldCsv) as Star[]
const calcMatrix = new THREE.Matrix4()
const geometry = new THREE.SphereGeometry(0.001)
const material = new THREE.MeshBasicMaterial({ toneMapped: false })
const starfieldMesh = new THREE.InstancedMesh(
  geometry,
  material,
  data.length
)

export function useStarfield(localPosition: Point = DEFAULT_COORDINATES) {
  const updateStarfield = useCallback(() => {
    const lmst = getLmst(localPosition)
  
    for (let i = 0; i < data.length; i++) {
      const datum = data[i]
  
      const starPosition = calcStarPosition(datum, lmst, localPosition)
  
      calcMatrix.setPosition(starPosition.x, starPosition.y, starPosition.z)
      starfieldMesh.setMatrixAt(i, calcMatrix)
      starfieldMesh.setColorAt(i, calcStarColor(datum))
    }
  }, [localPosition])

  const mesh = useMemo(() => {
    updateStarfield()
  
    return starfieldMesh
  }, [updateStarfield])

  useInterval(updateStarfield, 1000)

  return {
    mesh,
  }
}
