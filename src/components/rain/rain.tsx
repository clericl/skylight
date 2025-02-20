import { useRain } from '../../hooks'

export function Rain() {
  const rainMesh = useRain(800)

  return (
    <primitive object={rainMesh} />
  )
}
