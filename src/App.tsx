import { ClockWidget } from './components/clock-widget'
import { ThreeScene } from './components/three-scene'
import { styled } from '@mui/material'

import './App.css'
import { Center } from '@react-three/drei'

const Container = styled('main')`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`

function App() {
  return (
    <Container>
      <ThreeScene>
        <ClockWidget />
      </ThreeScene>
    </Container>
  )
}

export default App
