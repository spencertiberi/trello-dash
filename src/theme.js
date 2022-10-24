import { createTheme } from '@mui/material/styles'

const white = '#fefdf4'
const offWhite = '#eeede4'
const black = '#01020b'
const offBlack = '#11121b'
const darkenColor = `rgba(0,0,0,0.65)`
const lightenColor = `rgba(255,255,255,0.75)`
const fadeColor = `rgba(255,255,255,0.25)`

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 12,
    h1: {
      fontSize: '4rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '1.75rem',
    },
  },
  palette: {
    white,
    offWhite,
    black,
    offBlack,
    lightenColor,
    darkenColor,
    fadeColor,
    text: {
      primary: lightenColor,
      secondary: darkenColor,
    },
    // Teal
    primary: {
      light: '#39796b',
      main: '#004d40',
      dark: '#00251a',
      contrastText: white,
    },
    // Rose
    secondary: {
      light: '#e35183',
      main: '#ad1457',
      dark: '#78002e',
      contrastText: white,
    },
    // Coffee
    tertiary: {
      light: '#7b5e57',
      main: '#4e342e',
      dark: '#260e04',
      contrastText: white,
    },
    error: {
      light: '#f05545',
      main: '#b71c1c',
      dark: '#7f0000',
      contrastText: white,
    },
    tanya: {
      light: '#60ad5e',
      oldLight: '#60ad5e',
      main: '#2e7d32',
      oldDark: '#005005',
      dark: '#004e03',
      contrastText: white,
    },
    spencer: {
      light: '#58a5f0',
      oldLight: '#58a5f0',
      main: '#0277bd',
      oldDark: '#004c8c',
      dark: '#002c6c',
      contrastText: white,
    },
    alternating: {
      main: '#ff8a65',
      contrastText: darkenColor,
    },
    chores: {
      main: '#81d4fa',
      contrastText: darkenColor,
    },
    finances: {
      main: '#c5e1a5',
      contrastText: darkenColor,
    },
    project: {
      main: '#ce93d8',
      contrastText: darkenColor,
    },
    education: {
      main: '#F4C430',
      contrastText: darkenColor,
    },
  },
})

export default theme
