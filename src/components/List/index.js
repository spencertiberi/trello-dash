import { Cards } from './styles'
import {
  Avatar,
  Card,
  CardHeader,
  Chip,
  Stack,
  Paper,
  Typography,
} from '@mui/material'
import config from '../../config'

const ListCard = ({ cardInfo, members, listTitle }) => {
  const member = cardInfo.idMembers[0]
  const dueDate = new Date(cardInfo.due)
  const defaultColor = 'darkenColor'
  let avatar = <Avatar sx={{ bgcolor: 'grey' }}></Avatar>
  let color = defaultColor

  if (member) {
    const initials = members[member].initials
    color = config.memberColors[member]
    avatar = <Avatar sx={{ bgcolor: `${color}.main` }}>{initials}</Avatar>
  }

  const Labels = () => (
    <Stack
      direction="row-reverse"
      spacing={1}
      sx={{ padding: '0px 15px 10px' }}
    >
      {cardInfo.labels.map((label, i) => {
        return (
          <Chip
            key={i}
            label={label.name}
            color={`${
              config.labelsWithColors.includes(label.name.toLowerCase())
                ? label.name.toLowerCase()
                : 'tertiary'
            }`}
            size="small"
          />
        )
      })}
    </Stack>
  )

  return (
    <Card
      sx={{
        bgcolor: color !== defaultColor ? 'offWhite' : color,
        margin: '0 0 10px',
        opacity: ['Complete', 'Backlog'].includes(listTitle) ? 0.7 : 1,
      }}
      elevation={2}
    >
      <CardHeader
        avatar={listTitle !== 'Backlog' && avatar}
        title={cardInfo.name}
        titleTypographyProps={{
          fontSize: '1.1rem',
          color: `${color}.dark`,
        }}
        subheaderTypographyProps={{
          color: listTitle !== 'Complete' ? 'error.light' : 'success.light',
        }}
        subheader={cardInfo.due ? `Due: ${dueDate.toDateString()}` : ''}
        sx={{ padding: '16px 16px 0' }}
      />
      ${listTitle !== 'Backlog' && <Labels />}
    </Card>
  )
}

const List = ({ title, cards, members }) => {
  const listColor = () => {
    switch (title) {
      case 'Complete':
        return 'primary.main'
      case 'Backlog':
        return 'primary.main'
      case 'Queued Up':
        return 'primary.light'
      case 'Planned For Today':
        return 'primary.light'
      case 'In Progress':
        return 'primary.light'
      default:
        return 'fadeColor'
    }
  }

  const titleColor = () => {
    switch (title) {
      case 'Complete':
        return 'primary.main'
      case 'Backlog':
        return 'primary.main'
      default:
        return 'primary.light'
    }
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
      }}
      elevation={0}
    >
      <Typography variant="h2" sx={{ color: titleColor() }}>
        {title}
      </Typography>
      <Paper
        elevation={1}
        sx={{
          width: '18vw',
          padding: '1vw',
          backgroundColor: listColor(),
          height: '80vh',
          overflow: 'scroll',
        }}
      >
        <Cards>
          {cards.map((card, i) => (
            <ListCard
              key={i}
              cardInfo={card}
              members={members}
              listTitle={title}
            />
          ))}
        </Cards>
      </Paper>
    </Paper>
  )
}

export default List
