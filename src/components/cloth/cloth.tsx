export function Cloth() {
  console.log('running')

  return (
    <mesh castShadow position={[0, 3, 0]} >
      <boxGeometry args={[10, .01, 10]} />
      <noiseMaterial attach="material" />
      {/* <meshBasicMaterial color="red" /> */}
    </mesh>
  )
}
