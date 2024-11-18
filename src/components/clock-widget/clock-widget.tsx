import { useState } from "react";
import { DateTime } from 'luxon'
import { useInterval } from "usehooks-ts";
import { Stack, Typography, styled } from '@mui/material';

const ClockWidgetContainer = styled(Stack)`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24vw;
  
  background: linear-gradient(270deg, #ff00ff, #00ff00, #00ffff);
  background-size: 600% 600%;
  animation: fancy-gradient 19s ease infinite;
  
  @keyframes fancy-gradient {
    0%{background-position:0% 25%}
    50%{background-position:100% 50%}
    100%{background-position:0% 75%}
  }
  
  background-clip: text;
`
  
  const StyledTypography = styled(Typography)`
  font-size: inherit;
  font-family: Roboto Mono, monospace;
  color: rgb(0 0 0 / 20%);
`
  
const HMText = styled(StyledTypography)`
  margin-right: 0.15em;
`

const SubText = styled(StyledTypography)`
  font-size: 0.4em;
  line-height: 1;
`

export function ClockWidget() {
  const [hm, setHM] = useState('')
  const [second, setSecond] = useState('')
  const [period, setPeriod] = useState('')

  useInterval(() => {
    const dt = DateTime.now()

    setHM(dt.toFormat('h:mm'))
    setSecond(dt.toLocaleString({ second: '2-digit' }))
    setPeriod(dt.toFormat('a'))
  }, 100)

  return (
    <ClockWidgetContainer direction="row">
      <HMText>{hm}</HMText>
      <Stack justifyContent="center">
        <SubText>
          {second}
        </SubText>
        <SubText>
          {period}
        </SubText>
      </Stack>
    </ClockWidgetContainer>
  )
}
