import { ClockWidget } from './components/clock-widget'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThreeScene } from './components/three-scene'
import { WeatherWidget } from './components/weather-widget'
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
`

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <ThreeScene />
        {/* <ClockWidget />
        <WeatherWidget /> */}
      </Container>
    </QueryClientProvider>
  )
}

export default App
