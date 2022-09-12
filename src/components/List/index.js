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
  const defaultColor = 'lightenColor'
  let avatar = <Avatar sx={{ bgcolor: 'grey' }}></Avatar>
  let color = defaultColor

  if (member) {
    const initials = members[member].initials
    color = config.memberColors[member]
    avatar = <Avatar sx={{ bgcolor: `${color}.main` }}>{initials}</Avatar>
  }

  const Labels = () => (
    <Stack direction="row" spacing={1} sx={{ padding: '10px 15px 10px' }}>
      {cardInfo.labels.map((label, i) => (
        <Chip
          key={i}
          label={label.name}
          color={`${label.name.toLowerCase() || 'white'}`}
          size="small"
        />
      ))}
    </Stack>
  )

  return (
    <Card
      sx={{
        bgcolor: color !== defaultColor ? 'offWhite' : color,
        margin: '0 0 10px',
        // opacity: ['Complete', 'Backlog'].includes(listTitle) ? 0.7 : 1,
      }}
      elevation={2}
    >
      <CardHeader
        avatar={avatar}
        title={cardInfo.name}
        titleTypographyProps={{ fontSize: '1rem', color: `${color}.dark` }}
        subheaderTypographyProps={{
          color: listTitle !== 'Complete' ? 'error.light' : 'success.light',
        }}
        subheader={cardInfo.due ? `Due: ${dueDate.toDateString()}` : ''}
      />
      <Labels />
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
        return 'fadeColor'
      case 'Backlog':
        return 'fadeColor'
      default:
        return 'text.primary'
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
          width: '15vw',
          padding: '1vw',
          backgroundColor: listColor(),
          height: '80vh',
          overflow: 'scroll',
          opacity: ['Complete', 'Backlog'].includes(title) ? 0.7 : 1,
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
