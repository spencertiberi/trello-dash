import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { fetchWeatherApi } from 'openmeteo'
import { Typography } from '@mui/material'

const params = {
  latitude: 42.2498,
  longitude: -71.0739,
  current: [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'precipitation',
    'wind_speed_10m',
    'cloud_cover',
  ],
  daily: [
    'temperature_2m_max',
    'temperature_2m_min',
    'apparent_temperature_max',
    'apparent_temperature_min',
    'sunrise',
    'sunset',
    'uv_index_max',
    'precipitation_sum',
    'rain_sum',
    'showers_sum',
    'snowfall_sum',
    'precipitation_probability_max',
  ],
  temperature_unit: 'fahrenheit',
  wind_speed_unit: 'mph',
  precipitation_unit: 'inch',
  timezone: 'America/New_York',
  forecast_days: 1,
}
const url = 'https://api.open-meteo.com/v1/forecast'
let responses = await fetchWeatherApi(url, params)

// Helper function to form time ranges
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

//Process first location. Add a for-loop for multiple locations or weather models
// const response = responses[0]

// // Attributes for timezone and location
// const utcOffsetSeconds = response.utcOffsetSeconds()
// const current = response.current()
// const daily = response.daily()

// // Note: The order of weather variables in the URL query and the indices below need to match!
// const weatherData = {
//   current: {
//     time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
//     temperature2m: current.variables(0).value(),
//     relativeHumidity2m: current.variables(1).value(),
//     apparentTemperature: current.variables(2).value(),
//     precipitation: current.variables(3).value(),
//     windSpeed10m: current.variables(4).value(),
//   },
//   daily: {
//     time: range(
//       Number(daily.time()),
//       Number(daily.timeEnd()),
//       daily.interval(),
//     ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
//     temperature2mMax: daily.variables(0).valuesArray(),
//     temperature2mMin: daily.variables(1).valuesArray(),
//     apparentTemperatureMax: daily.variables(2).valuesArray(),
//     apparentTemperatureMin: daily.variables(3).valuesArray(),
//     sunrise: daily.variables(4).valuesArray(),
//     sunset: daily.variables(5).valuesArray(),
//     uvIndexMax: daily.variables(6).valuesArray(),
//     precipitationSum: daily.variables(7).valuesArray(),
//   },
// }

const Container = styled(Flex)`
  width: 90vw;
  height: 85vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: inherit;
`

const Row = styled(Flex)`
  width: 100%;
  flex-direction: row;
  height: 20vh;
  align-items: flex-start;
  justify-content: space-evenly;
`

const Temperature = styled(Flex)`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`

const Column = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Time = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Calendar = () => {
  const getData = async () => {
    responses = await fetchWeatherApi(url, params)
  }

  React.useEffect(() => {
    getData()
  })

  //Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0]

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds()
  const current = response.current()
  const daily = response.daily()

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0).value(),
      relativeHumidity2m: current.variables(1).value(),
      apparentTemperature: current.variables(2).value(),
      precipitation: current.variables(3).value(),
      windSpeed10m: current.variables(4).value(),
      cloudCover: current.variables(5).value(),
    },
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval(),
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2mMax: daily.variables(0).valuesArray(),
      temperature2mMin: daily.variables(1).valuesArray(),
      apparentTemperatureMax: daily.variables(2).valuesArray(),
      apparentTemperatureMin: daily.variables(3).valuesArray(),
      sunrise: daily.variables(4).valuesArray(),
      sunset: daily.variables(5).valuesArray(),
      uvIndexMax: daily.variables(6).valuesArray(),
      precipitationSum: daily.variables(7).valuesArray(),
      rainSum: daily.variables(8).valuesArray(),
      showersSum: daily.variables(9).valuesArray(),
      snowfallSum: daily.variables(10).valuesArray(),
      precipitationProbabilityMax: daily.variables(11).valuesArray(),
    },
  }

  const temp = Math.round(weatherData.current.temperature2m, 0)
  const feelsLike = Math.round(weatherData.current.apparentTemperature, 0)
  const minTemp = Math.round(weatherData.daily.apparentTemperatureMin, 0)
  const maxTemp = Math.round(weatherData.daily.apparentTemperatureMax, 0)
  const currentDate = new Date()
  const hrz = currentDate.getHours()
  const min = currentDate.getMinutes()
  let currentTime = min < 10 ? `${hrz}:0${min}` : `${hrz}:${min}`

  const weatherType = {
    emoji: '',
    precipitationChance: 0,
    precipitationTotal: 0,
  }

  console.log(weatherData.current.cloudCover)

  if (weatherData.daily.snowfallSum[0] > 0) {
    weatherType.emoji = '❄'
    weatherType.precipitationChance =
      weatherData.daily.precipitationProbabilityMax[0]
    weatherType.precipitationTotal = Math.round(
      weatherData.daily.snowfallSum,
      2,
    )
  } else if (weatherData.daily.precipitationProbabilityMax[0] > 0) {
    weatherType.emoji = '🌧️'
    weatherType.precipitationChance =
      weatherData.daily.precipitationProbabilityMax[0]
    weatherType.precipitationTotal = Math.round(
      weatherData.daily.precipitationSum[0],
      2,
    )
  } else if (weatherData.current.cloudCover > 0) {
    weatherType.emoji = weatherData.current.cloudCover < 50 ? '⛅️' : '☁️'
  } else {
    weatherType.emoji = '☀️'
  }

  return (
    <Container>
      <Row>
        <Time>
          <Typography
            variant="h1"
            sx={{
              color: 'primary.text',
              fontSize: '5em',
              margin: '0.25rem 0 0.75rem',
            }}
          >
            {currentTime}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: 'primary.contrastText',
              margin: '0.25rem 0 0.75rem',
            }}
          >
            {currentDate.toLocaleDateString()}
          </Typography>
        </Time>
        <Temperature>
          <Column>
            <Typography
              variant="h1"
              sx={{
                color: 'primary.text',
                margin: '1rem 1.5rem 0',
              }}
            >
              {weatherType.emoji}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: 'primary.text',
                margin: '0rem 1.5rem 0',
              }}
            >
              {weatherType.precipitationChance > 0 &&
                `${weatherType.precipitationChance}%`}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: 'primary.text',
                margin: '0.25rem 1.5rem 0',
              }}
            >
              {weatherType.precipitationTotal > 0 &&
                `${weatherType.precipitationTotal} in`}
            </Typography>
          </Column>
          <Column>
            <Typography
              variant="h1"
              sx={{
                color: 'primary.text',
                fontSize: '5em',
                margin: '0.25rem 0 0.75rem',
              }}
            >{`${temp} °F`}</Typography>
            <Typography
              variant="h2"
              sx={{
                color: 'primary.contrastText',
                margin: '0.25rem 0 0.75rem',
              }}
            >{`Feels Like ${feelsLike} °F`}</Typography>
          </Column>
          <Column>
            <Typography
              variant="h2"
              sx={{
                color: 'primary.text',
                margin: '1rem 1.5rem 0.75rem',
              }}
            >{`High ${maxTemp} °F`}</Typography>
            <Typography
              variant="h2"
              sx={{
                color: 'primary.text',
                margin: '0.25rem 1.5rem 0.75rem',
              }}
            >{`Low ${minTemp} °F`}</Typography>
          </Column>
        </Temperature>
      </Row>
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&mode=WEEK&showTitle=0&showNav=0&showDate=0&showTabs=0&showPrint=0&showCalendars=0&src=c3BlbmNlcmxlZXRAZ21haWwuY29t&src=c3BlbmNlcnRpYmVyaUBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=cDByYml2dm1mc2ljZHZqZWFqZjZqY3V0M2ljcWxqYTJAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=c3RpYmVyaUAydS5jb20&src=dGliZXJpQGJlcmtlbGV5LmVkdQ&color=%233F51B5&color=%23cc003c&color=%233F51B5&color=%2333ae06&color=%23AD1457&color=%234285F4&color=%23F6BF26"
        style={{ borderWidth: 0 }}
        width="1400"
        height="650"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </Container>
  )
}

export default Calendar
