const Template = require('../utils/template').default
const HTTP = require('../utils/http').default

class Handler {
  constructor () {
    this.template = new Template()
    this.http = new HTTP()
  }

  async handle (event) {
    const data = event.body ? JSON.parse(event.body) : event
    const response = data.id
      ? (await this.updateShort(data))
      : (await this.submitShort(data))

    return {
      statusCode: 201,
      body: JSON.stringify({ id: response.id }),
      headers: HTTP.corsHeaders()
    }
  }

  // Submits the feedback to SurveyMonkey
  async submitShort (data) {
    const answer = this.template.renderShort(data)
    return this.http.postResponse(answer)
  }

  // Updates a short feedback to SurveyMonkey
  async updateShort (data) {
    const answer = this.template.renderShort(data)
    return this.http.putResponse(data.id, answer)
  }
}

exports.default = Handler
exports.handler = (event) => {
  return new Handler().handle(event)
}
