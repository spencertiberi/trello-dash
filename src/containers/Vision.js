import React from 'react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { Typography } from '@mui/material'

const Item = ({ time, event }) => (
  <TimelineItem>
    <TimelineOppositeContent color="text.secondary">
      <Typography
        variant="h2"
        sx={{
          fontSize: '2em',
        }}
      >
        {time}
      </Typography>
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot color="primary" sx={{ width: '6px', height: '6px' }} />
      <TimelineConnector sx={{ bgcolor: 'primary.main', width: '4px' }} />
    </TimelineSeparator>
    <TimelineContent color="text.primary">
      <Typography
        variant="h2"
        sx={{
          fontSize: '2em',
          fontWeight: 'bold',
        }}
      >
        {event}
      </Typography>
    </TimelineContent>
  </TimelineItem>
)

const Container = styled(Flex)`
  width: 90vw;
  height: 85vh;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`

const Column = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const spencer = [
  {
    time: 'August 2024',
    event: 'Haas Year 2 Begins',
  },
  {
    time: 'September 2024',
    event: 'Group Product Manager',
  },
  {
    time: 'January 2025',
    event: 'Haas in Napa',
  },
  {
    time: 'March 2025',
    event: '34th Birthday',
  },
  {
    time: 'June 2025',
    event: 'Kid A',
  },
  {
    time: 'December 2025',
    event: 'Graduate from Haas',
  },
  {
    time: 'November 2025',
    event: 'Director of Product',
  },
  {
    time: 'July 2027',
    event: 'VP of Product',
  },
]

const tanya = [
  {
    time: 'November 2024',
    event: '36th Birthday',
  },
  {
    time: 'June 2025',
    event: 'Kid A',
  },
]

const Vision = () => (
  <Container>
    <Column>
      <Typography
        variant="h1"
        sx={{
          fontSize: '3em',
          color: 'primary.text',
          margin: '0.25rem 0',
        }}
      >
        Tanya
      </Typography>
      <Timeline>
        {tanya.map(({ time, event }) => (
          <Item time={time} event={event} />
        ))}
      </Timeline>
    </Column>
    <Column>
      <Typography
        variant="h1"
        sx={{
          fontSize: '3em',
          color: 'primary.text',
          margin: '0.25rem 0',
        }}
      >
        Spencer
      </Typography>
      <Timeline position="alternate">
        {spencer.map(({ time, event }) => (
          <Item time={time} event={event} />
        ))}
      </Timeline>
    </Column>
  </Container>
)

export default Vision
