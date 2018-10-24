const Template = require('../utils/template').default
const HTTP = require('../utils/http').default

class Handler {
  constructor () {
    this.template = new Template()
    this.http = new HTTP()
  }

  async handle (event) {
    let data = event.body ? JSON.parse(event.body) : event
    let response = await this.submitLong(data)

    return {
      statusCode: 201,
      body: JSON.stringify({ id: response.id }),
      headers: HTTP.corsHeaders()
    }
  }

  async submitLong (data) {
    let answer = this.template.renderLong(data)
    return this.http.putResponse(data.id, answer)
  }
}

exports.default = Handler
exports.handler = (event) => {
  return new Handler().handle(event)
}
