import * as THREE from 'three'
import { calcStarColor, calcStarPosition, getLmst } from "../utils";
import { useCallback, useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { Line2, LineGeometry, LineMaterial } from "three/examples/jsm/Addons.js";
import { CELESTIAL_UPDATE_INTERVAL, DEFAULT_COORDINATES } from "../constants";
import type { Constellation, Point } from "../types";
import { useThree } from '@react-three/fiber';

const calcBox = new THREE.Box3()
const calcVec = new THREE.Vector3()
const calcMatrix = new THREE.Matrix4()
const lineMaterial = new LineMaterial({
  color: new THREE.Color(1, 1.5, 2),
  linewidth: 0.4,
  toneMapped: false,
  transparent: true,
  opacity: 0.1,
})
const starGeometry = new THREE.SphereGeometry(0.0015)
const starMaterial = new THREE.MeshBasicMaterial({ toneMapped: false, transparent: true })

export function useConstellations(constellationList: Constellation[], localPosition: Point = DEFAULT_COORDINATES) {
  const { invalidate } = useThree()
  
  const [[constellationsArr, pointsMesh, constellationsGroup]] = useState<[
    Line2[][],
    THREE.InstancedMesh,
    THREE.Group,
  ]>(() => {
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

    const pointsMesh = new THREE.InstancedMesh(
      starGeometry,
      starMaterial,
      starCount
    )

    invalidate()

    return [constellationsArr, pointsMesh, constellationsGroup]
  })

  const updatePositions = useCallback(() => {
    const lmst = getLmst(localPosition)

    let pointCount = 0

    for (let i = 0; i < constellationsArr.length; i++) {
      const lines = constellationsArr[i]
      const linePositions = []

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
        linePositions.push(...positions)
      }

      calcBox.setFromArray(linePositions)
      calcBox.getCenter(calcVec)
    }

    pointsMesh.instanceColor!.needsUpdate = true
    pointsMesh.instanceMatrix!.needsUpdate = true

    invalidate()
  }, [constellationsArr, constellationList, invalidate, localPosition, pointsMesh])

  useEffect(() => {
    updatePositions()

    return () => {
      pointsMesh.dispose()
    }
  }, [pointsMesh, updatePositions])

  useInterval(updatePositions, CELESTIAL_UPDATE_INTERVAL)

  return {
    constellationsArr,
    constellationsGroup,
    pointsMesh,
  }
}
