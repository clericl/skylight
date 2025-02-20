import { Clouds } from "../clouds";
import { Rain } from "../rain";

export function Weather() {
  return (
    <group position={[0, 0.4, 0]}>
      <Clouds />
      <Rain />
    </group>
  )
}
