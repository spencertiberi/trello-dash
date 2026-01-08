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
      <TimelineDot color="primary" sx={{ width: '8px', height: '8px' }} />
      <TimelineConnector sx={{ bgcolor: 'primary.main', width: '5px' }} />
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
    time: 'March 2026',
    event: '35th Birthday',
  },
  {
    time: 'May 2026',
    event: 'Graduate from Haas',
  },
  {
    time: 'June 2026',
    event: "Kaito's First Birthday",
  },
  {
    time: 'June 2026',
    event: 'Start New Product Role',
  },
  {
    time: 'October 2026',
    event: 'Group Product Manager',
  },
  {
    time: 'July 2030',
    event: 'VP of Product',
  },
]

const tanya = [
  {
    time: 'May 2026',
    event: 'Open 2P Market',
  },
  {
    time: 'June 2026',
    event: "Kaito's First Birthday",
  },
  {
    time: 'November 2026',
    event: '38th Birthday',
  },
  {
    time: 'TBD 2027',
    event: 'Open New Concept',
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
      <Timeline position="alternate" sx={{ width: '45vw' }}>
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
      <Timeline position="alternate" sx={{ width: '45vw' }}>
        {spencer.map(({ time, event }) => (
          <Item time={time} event={event} />
        ))}
      </Timeline>
    </Column>
  </Container>
)

export default Vision
