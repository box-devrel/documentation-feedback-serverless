const HTTP = require('../../src/utils/http').default

test('HTTP to be a class', () => {
  expect(HTTP).not.toBeUndefined()
  expect(HTTP.constructor).not.toBeUndefined()
  expect(HTTP).toBeInstanceOf(Object)
})

let data
let http

beforeEach(() => {
  data = { useful: true }
  http = new HTTP()
  http.SURVEY_COLLECTOR_ID = '<SURVEY_COLLECTOR_ID>'
  http.SURVEY_MONKEY_ACCESS_TOKEN = '<SURVEY_MONKEY_ACCESS_TOKEN>'

  http.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({})
  }))
})

test('.postResponse()', () => {
  http.postResponse(data)

  expect(http.fetch).toHaveBeenCalledWith(
    'https://api.surveymonkey.com/v3/collectors/<SURVEY_COLLECTOR_ID>/responses',
    {
      'body': '{"useful":true}',
      'headers': {
        'Authorization': 'Bearer <SURVEY_MONKEY_ACCESS_TOKEN>',
        'Content-Type': 'application/json'
      },
      'method': 'POST',
      'mode': 'cors'
    }
  )
})

test('.putResponse()', () => {
  http.putResponse('<RESPONSE_ID>', data)

  expect(http.fetch).toHaveBeenCalledWith(
    'https://api.surveymonkey.com/v3/collectors/<SURVEY_COLLECTOR_ID>/responses/<RESPONSE_ID>',
    {
      'body': '{"useful":true}',
      'headers': {
        'Authorization': 'Bearer <SURVEY_MONKEY_ACCESS_TOKEN>',
        'Content-Type': 'application/json'
      },
      'method': 'PUT',
      'mode': 'cors'
    }
  )
})

test('.corsHeaders()', () => {
  let oldEnv = process.env.SM_PRODUCTION

  process.env.SM_PRODUCTION = ''
  let developmentHeaders = HTTP.corsHeaders()
  expect(developmentHeaders).toEqual({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })

  process.env.SM_PRODUCTION = true
  let productionHeaders = HTTP.corsHeaders()
  expect(productionHeaders).toEqual({
    'Access-Control-Allow-Origin': 'https://developer.box.com',
    'Access-Control-Allow-Credentials': true
  })

  process.env.SM_PRODUCTION = oldEnv
})
