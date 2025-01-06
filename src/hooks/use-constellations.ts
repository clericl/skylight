import { useCallback, useState } from "react";
import { Line2, LineGeometry, LineMaterial } from "three/examples/jsm/Addons.js";
import * as THREE from 'three'
import type { Constellation, Point } from "../types";
import { calcStarColor, calcStarPosition, getLmst } from "../utils";
import { CELESTIAL_UPDATE_INTERVAL, DEFAULT_COORDINATES } from "../constants";
import { useInterval } from "usehooks-ts";

const calcMatrix = new THREE.Matrix4()
const lineMaterial = new LineMaterial({ color: 'white', linewidth: 0.1 })
const starGeometry = new THREE.SphereGeometry(0.002)
const starMaterial = new THREE.MeshBasicMaterial({ toneMapped: false })

export function useConstellations(constellationList: Constellation[], localPosition: Point = DEFAULT_COORDINATES) {
  const [[constellationsArr, pointsMesh, constellationsGroup]] = useState<[Line2[][], THREE.InstancedMesh, THREE.Group]>(() => {
    const constellationsArr: Line2[][] = []
    const constellationsGroup = new THREE.Group()
    
    let starCount = 0

    for (const constellation of constellationList) {
      const linesArr: Line2[] = []
      const linesGroup = new THREE.Group()

      for (let i = 0; i < constellation.lines.length; i++) {
        const line = new Line2(
          new LineGeometry(),
          lineMaterial
        )

        linesGroup.add(line)
        linesArr.push(line)

        starCount += constellation.lines[i].length
      }

      linesGroup.name = constellation.label
      constellationsGroup.add(linesGroup)
      constellationsArr.push(linesArr)
    }

    const instanced = new THREE.InstancedMesh(
      starGeometry,
      starMaterial,
      starCount
    )

    constellationsGroup.add(instanced)

    return [constellationsArr, instanced, constellationsGroup]
  })

  const updatePositions = useCallback(() => {
    const lmst = getLmst(localPosition)

    let pointCount = 0

    for (let i = 0; i < constellationsArr.length; i++) {
      const lines = constellationsArr[i]

      for (let j = 0; j < lines.length; j++) {
        const line = lines[j]
        const positions = []

        for (const vertexStar of constellationList[i].lines[j]) {
          const starPosition = calcStarPosition(vertexStar, lmst, localPosition)
          
          positions.push(starPosition.x, starPosition.y, starPosition.z)
          calcMatrix.setPosition(starPosition.x, starPosition.y, starPosition.z)
          pointsMesh.setMatrixAt(pointCount, calcMatrix)
          pointsMesh.setColorAt(pointCount, calcStarColor(vertexStar, 0.3))
          
          pointCount++
        }

        line.geometry.setPositions(positions)
      }
    }
  }, [constellationsArr, constellationList, localPosition, pointsMesh])

  useInterval(updatePositions, CELESTIAL_UPDATE_INTERVAL)

  return {
    constellationsArr,
    constellationsGroup,
    pointsMesh,
  }
}
