import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { Typography, Paper } from '@mui/material'

export const ListWrapper = styled(Flex)`
  flex-direction: column;
  border-radius: 10px;
  width: 18vw;
  padding: 10px;
  height: 90vh;
`

export const Cards = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
`

export const ListHeader = styled(Typography)`
  font-size: 2em;
`

export const ListBackground = styled(Paper)`
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 100%);
  border-radius: 0px 0px 5px 5px;
`