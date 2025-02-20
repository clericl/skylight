import { CelestialSphere } from './components/celestial-sphere'
import { Clock } from './components/clock'
import { Sky } from './components/sky'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThreeScene } from './components/three-scene'
import { styled } from '@mui/material'

import './App.css'
import { Weather } from './components/weather'

const queryClient = new QueryClient()

const Container = styled('main')`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <ThreeScene>
          <CelestialSphere />
          <Sky />
          <Weather />
        </ThreeScene>
        <Clock />
      </Container>
    </QueryClientProvider>
  )
}

export default App
