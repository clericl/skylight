import { useState } from "react";
import { DateTime } from 'luxon'
import { useInterval } from "usehooks-ts";
import { Stack, Typography, styled } from '@mui/material';

const ClockContainer = styled(Stack)`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24vw;
  
  background: linear-gradient(270deg, #ff00ff, #ffffff, #00ffff, #000000);
  background-size: 800% 800%;
  animation: fancy-gradient 30s ease infinite;
  
  @keyframes fancy-gradient {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
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

export function Clock() {
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
    <ClockContainer direction="row">
      <HMText>{hm}</HMText>
      <Stack justifyContent="center">
        <SubText>
          {second}
        </SubText>
        <SubText>
          {period}
        </SubText>
      </Stack>
    </ClockContainer>
  )
}
