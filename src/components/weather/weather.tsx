import { Stack, Typography, styled } from "@mui/material"
import { useWeather } from "../../hooks"
import { useMemo } from "react"
import { stringifyWeather } from "../../utils"

const WeatherContainer = styled(Stack)`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 5em;

  background: linear-gradient(270deg, #ff00ff, #00ffff);
  background-size: 400% 400%;
  animation: fancy-gradient 19s ease infinite;
  
  @keyframes fancy-gradient {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
  }
  
  background-clip: text;
`

const DetailTypography = styled(Typography)`
  font-family: Lato, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: inherit;
  line-height: 1.2;
  display: flex;
  align-items: center;
  column-gap: 0.25em;
  color: rgb(0 0 0 / 20%);
`

export function Weather() {
  const weather = useWeather()

  const stringified = useMemo(() => {
    if (weather.data) {
      return stringifyWeather(weather.data.weather)
    }

    return null
  }, [weather.data])

  return weather.data ? (
    <WeatherContainer>
      <DetailTypography>
        {weather.data.temperature.value}°{weather.data.temperature.unit}
      </DetailTypography>
      <DetailTypography>
        {stringified}
      </DetailTypography>
    </WeatherContainer>
  ) : null
}
