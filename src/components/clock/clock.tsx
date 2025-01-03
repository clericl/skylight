import { useState } from "react";
import { DateTime } from 'luxon'
import { useInterval } from "usehooks-ts";
import { Stack, Typography, styled } from '@mui/material';

const ClockContainer = styled(Stack)`
  position: absolute;
  right: 2%;
  bottom: 0;
  font-size: 20vw;
  color: white;
  `
  
  const StyledTypography = styled(Typography)`
  font-size: inherit;
  font-family: Geist Mono, monospace;
  font-weight: 100;
  line-height: 1;
`
  
const HMText = styled(StyledTypography)`
  margin-right: 0.15em;
`

const SubText = styled(StyledTypography)`
  font-size: 0.4em;
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
