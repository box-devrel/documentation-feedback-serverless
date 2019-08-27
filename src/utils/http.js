const fetch = require('node-fetch')

const BASE_URL = 'https://api.surveymonkey.com'

exports.default = class HTTP {
  constructor () {
    this.fetch = fetch

    this.SURVEY_COLLECTOR_ID = process.env.SM_PRODUCTION ? '219155553' : '219156108'
    this.SURVEY_MONKEY_ACCESS_TOKEN = process.env.SM_ACCESS_TOKEN
  }

  // POST a new short response
  postResponse (data) {
    const url = `${BASE_URL}/v3/collectors/${this.SURVEY_COLLECTOR_ID}/responses`
    return this.fetch(url, this.options('POST', data))
      .then(res => res.json())
      .catch(console.error)
  }

  // PUT an update to a response
  putResponse (id, data) {
    const url = `${BASE_URL}/v3/collectors/${this.SURVEY_COLLECTOR_ID}/responses/${id}`
    return this.fetch(url, this.options('PUT', data))
      .then(res => res.json())
      .catch(console.error)
  }

  // Determines the CORS headers for this environment
  static corsHeaders () {
    const origin = (process.env.SM_PRODUCTION ? 'https://developer.box.com' : '*')

    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true
    }
  }

  // PRIVATE

  options (method, data) {
    return {
      method: method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.SURVEY_MONKEY_ACCESS_TOKEN}`
      },
      body: JSON.stringify(data)
    }
  }
}
