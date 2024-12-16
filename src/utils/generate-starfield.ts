import starfieldCsv from '../assets/stardata.csv?raw'
import * as d3 from 'd3-dsv'
import * as THREE from 'three'

export function generateStarfield() {
  const data = d3.csvParse(starfieldCsv)
  console.log(data)

  const geometry = new THREE.SphereGeometry(0.01)
  const material = new THREE.MeshBasicMaterial({ color: 'white' })
  const mesh = new THREE.InstancedMesh(
    geometry,
    material,
    data.length
  )

  const matrix = new THREE.Matrix4()

  for (let i = 0; i < data.length; i++) {
    const datum = data[i]

    matrix.setPosition(Number(datum.x0), Number(datum.y0), Number(datum.z0))
    mesh.setMatrixAt(i, matrix)
  }

  mesh.computeBoundingBox()
  console.log(mesh.boundingBox)

  return mesh
}
