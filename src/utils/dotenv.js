const dotenv = require('dotenv')

dotenv.config()

module.exports.vars = () => ({
  sm_access_token: process.env.SURVEY_MONKEY_ACCESS_TOKEN
})
