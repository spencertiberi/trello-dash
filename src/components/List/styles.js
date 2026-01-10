import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { Typography, Paper, Card } from '@mui/material'

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
  margin-bottom: 1em;
`

export const ListBackground = styled(Paper)`
  background: ${props => props.complete ? `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.09) 45%, rgba(0,0,0,0.15) 100%)` : 
    `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.27) 45%, rgba(255,255,255,0.45) 100%)`};
  border-radius: 0px 0px 5px 5px;
`