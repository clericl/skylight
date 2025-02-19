import { CelestialSphere } from './components/celestial-sphere'
import { Clock } from './components/clock'
import { DaySky } from './components/day-sky'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThreeScene } from './components/three-scene'
import { styled } from '@mui/material'

import './App.css'

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
          <CelestialSphere fadeWithTime />
          <DaySky />
        </ThreeScene>
        <Clock />
      </Container>
    </QueryClientProvider>
  )
}

export default App
