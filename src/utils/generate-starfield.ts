import starfieldCsv from '../assets/stardata.csv?raw'
import * as d3 from 'd3-dsv'
import * as THREE from 'three'
import type { Point, Star } from '../types'
import { calcStarPosition } from './calc-star-position'
import { getLmst } from './get-lmst'
import { DEFAULT_COORDINATES } from '../constants'

const calcVec = new THREE.Vector3()
const calcMatrix = new THREE.Matrix4()
const calcColor = new THREE.Color()

export function generateStarfield(localPosition: Point = DEFAULT_COORDINATES) {
  const data = d3.csvParse(starfieldCsv) as Star[]

  const geometry = new THREE.SphereGeometry(0.001)
  const material = new THREE.MeshBasicMaterial({ toneMapped: false })
  const mesh = new THREE.InstancedMesh(
    geometry,
    material,
    data.length
  )

  const lmst = getLmst(localPosition)

  for (let i = 0; i < data.length; i++) {
    const datum = data[i]

    const { altitude, azimuth } = calcStarPosition(datum, lmst, localPosition)

    calcVec.setFromSphericalCoords(1, altitude, azimuth)

    calcMatrix.setPosition(calcVec.x, calcVec.y, calcVec.z)
    mesh.setMatrixAt(i, calcMatrix)

    const expMag = Math.pow(100, ((5 - Number(datum.mag)) / 5)) * 0.01

    mesh.setColorAt(i, calcColor.setRGB(expMag * 1.1, expMag * 1.1, expMag))
  }

  return mesh
}
