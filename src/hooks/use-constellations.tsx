import { DEFAULT_COORDINATES } from "../constants";
import { Constellation, Point } from "../types";
import * as THREE from 'three'
import { calcStarPosition } from "../utils/calc-star-position";
import { getLmst } from "../utils/get-lmst";
import { Line2, LineGeometry, LineMaterial } from "three/examples/jsm/Addons.js";
import { useEffect, useMemo, useState } from "react";
import { Text } from "@react-three/drei";
import { calcStarColor } from "../utils";

const calcBox = new THREE.Box3()
const calcMatrix = new THREE.Matrix4()
const geometry = new THREE.SphereGeometry(0.002)
const lineMaterial = new LineMaterial({ color: 'white', linewidth: 0.1 })
const starMaterial = new THREE.MeshBasicMaterial({ toneMapped: false })

export function useConstellations(constellationList: Constellation[], localPosition: Point = DEFAULT_COORDINATES) {
  const [starfieldMesh] = useState(new THREE.InstancedMesh(
    geometry,
    starMaterial,
    constellationList.reduce((acc: number, el: Constellation) => acc += el.lines.flat().length, 0)
  ))

  const items = useMemo(() => {
    const lmst = getLmst(localPosition)

    const labels = []
    const group = new THREE.Group()
    
    let starCount = 0

    for (const constellation of constellationList) {

      const constellationGroup = new THREE.Group()
      constellationGroup.name = constellation.id
  
      for (const line of constellation.lines) {
        const positions = []
        const geometry = new LineGeometry()
        const mesh = new Line2(geometry, lineMaterial)
  
        for (let i = 0; i < line.length; i++) {
          const vertexStar = line[i]
  
          const starPosition = calcStarPosition(vertexStar, lmst, localPosition)
  
          positions.push(starPosition.x, starPosition.y, starPosition.z)
  
          calcMatrix.setPosition(starPosition.x, starPosition.y, starPosition.z)
          starfieldMesh.setMatrixAt(starCount, calcMatrix)
          starfieldMesh.setColorAt(starCount, calcStarColor(vertexStar, 0.3))
          starCount++
        }
  
        geometry.setPositions(positions)
        constellationGroup.add(mesh)
      }

      const labelPosition = new THREE.Vector3()

      calcBox.setFromObject(constellationGroup)
      calcBox.getCenter(labelPosition)

      const label = (
        <Text fontSize={0.01} position={labelPosition}>
          {constellation.label}
        </Text>
      )

      group.add(constellationGroup)
      labels.push(label)
    }

    group.add(starfieldMesh)

    return {
      mesh: group,
      labels,
    }
  }, [constellationList, localPosition, starfieldMesh])

  useEffect(() => {
    return () => {
      starfieldMesh.dispose()      
    }
  }, [starfieldMesh])

  return items
}
