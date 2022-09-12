import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { useTheme } from '@mui/material/styles'

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

export const ListHeader = styled.h2`
  font-size: 1em;
`
