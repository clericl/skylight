import { DEFAULT_COORDINATES } from "../constants";
import { Point } from "../types";
import constellations from "../assets/constellations.json"
import * as THREE from 'three'
import { calcStarPosition } from "../utils/calc-star-position";
import { getLmst } from "../utils/get-lmst";
import { Line2, LineGeometry, LineMaterial } from "three/examples/jsm/Addons.js";
import { useMemo } from "react";
import { Text } from "@react-three/drei";

const calcVec = new THREE.Vector3()
const calcBox = new THREE.Box3()
const material = new LineMaterial({ color: 'white', linewidth: 0.1 })

export function useConstellations(localPosition: Point = DEFAULT_COORDINATES) {
  const items = useMemo(() => {
    const lmst = getLmst(localPosition)
    const labels = []
    const constellationsGroup = new THREE.Group()
    constellationsGroup.name = 'constellations'
  
    for (const constellation of constellations) {
      const constellationGroup = new THREE.Group()
      constellationGroup.name = constellation.id
  
      for (const line of constellation.lines) {
        const positions = []
        const geometry = new LineGeometry()
        const mesh = new Line2(geometry, material)
  
        for (let i = 0; i < line.length; i++) {
          const vertexStar = line[i]
  
          const starPosition = calcStarPosition(vertexStar, lmst, localPosition)
  
          positions.push(starPosition.x, starPosition.y, starPosition.z)
  
          const point = new THREE.Mesh(
            new THREE.SphereGeometry(0.001),
            new THREE.MeshBasicMaterial()
          )
  
          point.position.copy(calcVec)
          constellationGroup.add(point)
        }
  
        geometry.setPositions(positions)
        constellationGroup.add(mesh)
      }

      const labelPosition = new THREE.Vector3()

      calcBox.setFromObject(constellationGroup)
      calcBox.getCenter(labelPosition)

      labels.push(
        <Text scale={0.01} position={labelPosition}>
          {constellation.label}
        </Text>
      )
  
      constellationsGroup.add(constellationGroup)
    }

    return {
      mesh: constellationsGroup,
      labels,
    }
  }, [localPosition])

  return items
}
