import * as d3 from 'd3-dsv'
import * as THREE from 'three'
import starfieldCsv from '../assets/stardata.csv?raw'
import { calcStarColor, calcStarPosition } from '../utils'
import { getLmst } from '../utils/get-lmst'
import { useCallback, useMemo } from 'react'
import { useInterval } from 'usehooks-ts'
import { CELESTIAL_UPDATE_INTERVAL, DEFAULT_COORDINATES } from '../constants'
import type { Point, Star } from '../types'

const data = (d3.csvParse(starfieldCsv) as Star[])
const calcMatrix = new THREE.Matrix4()
const geometry = new THREE.SphereGeometry(0.001)
const material = new THREE.MeshBasicMaterial({
  toneMapped: false,
  transparent: true,
})
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

    starfieldMesh.instanceColor!.needsUpdate = true
    starfieldMesh.instanceMatrix!.needsUpdate = true
  }, [localPosition])

  const mesh = useMemo(() => {
    updateStarfield()
  
    return starfieldMesh
  }, [updateStarfield])

  useInterval(updateStarfield, CELESTIAL_UPDATE_INTERVAL)

  return {
    mesh,
  }
}
