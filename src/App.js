import React from 'react'
import List from './components/List'
import { ThemeProvider } from '@mui/material/styles'
import { Paper, Typography, Button } from '@mui/material'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import theme from './theme'

const API_KEY = process.env.REACT_APP_API_KEY
const API_TOKEN = process.env.REACT_APP_API_TOKEN
const API_ROOT = 'https://api.trello.com/1/boards/nJvXNgCL/?'
const BOARD_QUERY = 'fields=name&'
const MEMBER_QUERY = 'members=all&'
const CARD_QUERY = 'cards=open&'
const LIST_QUERY = 'lists=all&'
const QUERY_API_CRED = `key=${API_KEY}&token=${API_TOKEN}`

const App = () => {
  const [refesh, setRefresh] = React.useState('')
  const [members, setMembers] = React.useState({})
  const [lists, setLists] = React.useState([])
  const [cards, setCards] = React.useState([])

  const handle = useFullScreenHandle()

  React.useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${API_ROOT}${BOARD_QUERY}${MEMBER_QUERY}${CARD_QUERY}${LIST_QUERY}${QUERY_API_CRED}`,
      )
        .then((resp) => resp.json())
        .then((resp) => {
          const membersObject = {}
          resp.members.forEach((member) => {
            const memberId = member.id
            Object.assign(membersObject, { [memberId]: member })
          })

          setMembers(membersObject)
          setLists(resp.lists)
          setCards(resp.cards)
        })
        .then(
          setTimeout(() => {
            const timestamp = new Date()
            console.log(`Fetched at ${timestamp}`)
            setRefresh(timestamp)
          }, 5000),
        )
    }

    fetchData()
  }, [refesh])

  const Board = () => {
    const alphaOrder = (a, b) => {
      if (a.name > b.name) {
        return 1
      } else if (a.name < b.name) {
        return -1
      } else {
        return 0
      }
    }

    const sortDue = (a, b) => {
      if (a.due === null && b.due !== null) {
        return 1
      } else if (a.due !== null && b.due === null) {
        return -1
      } else if (a.due > b.due) {
        return 1
      } else if (a.due < b.due) {
        return -1
      } else {
        return alphaOrder(a, b)
      }
    }

    const listData = lists.map((list, i) => {
      const listCards = cards.filter((card) => card.idList === list.id)
      if (list.name === 'Backlog') {
        return
      }
      return (
        <List
          title={list.name}
          cards={listCards.sort(sortDue)}
          members={members}
          key={i}
        />
      )
    })

    return (
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '90vw',
          height: '85vh',
          background: 'transparent',
        }}
        elevation={0}
      >
        {listData}
      </Paper>
    )
  }

  console.log(handle)

  return (
    <ThemeProvider theme={theme}>
      <FullScreen handle={handle}>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'primary.dark',
            borderRadius: '0px',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: 'primary.contrastText',
              margin: '0.25rem 0 0.75rem',
            }}
          >
            19 Buck TODO List
          </Typography>
          <Button
            color="primary"
            onClick={handle[`${handle.active === false ? 'enter' : 'exit'}`]}
            sx={{ position: 'absolute', right: '15px', top: '15px' }}
            disableElevation
          >
            {`${handle.active === false ? 'Enter' : 'Exit'} FullScreen`}
          </Button>
          <Board />
        </Paper>
      </FullScreen>
    </ThemeProvider>
  )
}

export default App
