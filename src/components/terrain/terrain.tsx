import { Center } from '@react-three/drei';
import * as THREE from 'three'
import { ImprovedNoise } from "three/examples/jsm/Addons.js";

const worldWidth = 256, worldDepth = 256;

function generateHeight(width: number, height: number) {
  let seed = Math.PI / 4

  window.Math.random = function() {
    const x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }

  const size = width * height
  const data = new Uint8Array(size)
  const perlin = new ImprovedNoise()
  const z = Math.random() * 100

  let quality = 1

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < size; i++) {
      const x = i % width
      const y = ~ ~ (i / width)
      data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 1.75)
    }

    quality *= 5
  }

  return data
}

function generateTexture(data: Uint8Array, width: number, height: number) {
  const vector3 = new THREE.Vector3(0, 0, 0)

  const sun = new THREE.Vector3(1, 1, 1)
  sun.normalize()

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')

  if (context) {
    context.fillStyle = '#000'
    context.fillRect(0, 0, width, height)

    const image = context?.getImageData(0, 0, canvas.width, canvas.height)
    const imageData = image?.data
  
    if (imageData) {
      for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
        vector3.x = data[j - 2] - data[j + 2]
        vector3.y = 2
        vector3.z = data[j - width * 2] - data[j + width * 2]
        vector3.normalize()
  
        const shade = vector3.dot(sun)
  
        imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007)
        imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007)
        imageData[i + 2] = (shade * 96) * (0.5 + data[j] * 0.007)
      }
  
      context.putImageData(image, 0, 0)

      const scaledCanvas = document.createElement('canvas')
      scaledCanvas.width = width * 4
      scaledCanvas.height = height * 4

      const scaledContext = scaledCanvas.getContext('2d')

      if (scaledContext) {
        scaledContext.scale(4, 4)
        scaledContext.drawImage(canvas, 0, 0)
  
        const scaledImage = scaledContext.getImageData(0, 0, scaledCanvas.width, scaledCanvas.height)
        const scaledImageData = image.data

        for ( let i = 0, l = scaledImageData.length; i < l; i += 4 ) {
          const v = ~ ~ (Math.random() * 5)

          scaledImageData[i] += v
          scaledImageData[i + 1] += v
          scaledImageData[i + 2] += v
        }

        scaledContext.putImageData(scaledImage, 0, 0 )

        return scaledCanvas
      }
    }
  }
  
  return null
}

function createTerrain() {
  const data = generateHeight(worldWidth, worldDepth)

  const geometry = new THREE.PlaneGeometry(7500, 7500, worldWidth - 1, worldDepth - 1)
  geometry.rotateX(-Math.PI / 2)
  
  const vertices = geometry.attributes.position.array
  
  for (let i = 0, j = 0, l = vertices.length; i < l; i++, j+= 3) {
    vertices[j + 1] = data[i] * 10
  }

  const textureData = generateTexture(data, worldWidth, worldDepth)

  if (textureData) {
    const texture = new THREE.CanvasTexture(textureData)
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    texture.colorSpace = THREE.SRGBColorSpace

    return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }))
  }

  return null
}

const terrain = createTerrain()

export function Terrain() {
  return terrain ? (
    <Center bottom>
      <primitive scale={[1, 0.5, 1]} object={terrain} />
    </Center>
  ) : null
}
