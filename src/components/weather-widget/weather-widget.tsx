import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Stack, Typography, styled } from "@mui/material"
import { useWeather } from "../../hooks"
import { UNITS } from '../../constants';

const WeatherWidgetContainer = styled(Stack)`
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

export function WeatherWidget() {
  const weather = useWeather()

  return weather.data ? (
    <WeatherWidgetContainer>
      <DetailTypography>
        <ThermostatIcon fontSize="inherit" />
        {weather.data.temperature}°{weather.data.temperatureUnit}
      </DetailTypography>
      <DetailTypography>
        <AirIcon fontSize="inherit" />
        {weather.data.windSpeed.replace(' ', '')} {weather.data.windDirection}
      </DetailTypography>
      {weather.data.probabilityOfPrecipitation.value !== null && (
        <DetailTypography>
          <WaterDropIcon fontSize="inherit" />
          {weather.data.probabilityOfPrecipitation.value}{UNITS[weather.data.probabilityOfPrecipitation.unitCode as string] ?? ''}
        </DetailTypography>
      )}
    </WeatherWidgetContainer>
  ) : null
}
