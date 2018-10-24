exports.default = class Template {
  constructor () {
    this.responseTemplate = {
      pages: [
        {
          id: (process.env.SM_PRODUCTION ? '47128554' : '47129534'),
          questions: [
            // URL
            { id: (process.env.SM_PRODUCTION ? '164337216' : '164341787'), answers: [{}] },
            // yes/no
            { id: (process.env.SM_PRODUCTION ? '164337720' : '164341788'), answers: [{}] }
          ]
        }
      ]
    }

    this.nameTemplate = { id: (process.env.SM_PRODUCTION ? '164337973' : '164341789'), answers: [{}] }
    this.emailTemplate = { id: (process.env.SM_PRODUCTION ? '164338049' : '164341790'), answers: [{}] }
    this.noteTemplate = { id: (process.env.SM_PRODUCTION ? '164338156' : '164341791'), answers: [{}] }

    // The ID's of the answers to the question "Was this page useful?"
    this.usefulAnswerID = (process.env.SM_PRODUCTION ? '1155084831' : '1155115696')
    this.notUsefulAnswerID = (process.env.SM_PRODUCTION ? '1155084834' : '1155115697')
  }

  // Turns a simple feedback into a SurveyMonkey
  // compatible format
  renderShort (feedback) {
    this.responseTemplate.response_status = 'partial'
    // Extract the URL
    this.responseTemplate.pages[0].questions[0].answers[0].text = feedback.url
    // Extract if the feedback was positive
    this.responseTemplate.pages[0].questions[1].answers[0].choice_id = feedback.useful
      ? this.usefulAnswerID
      : this.notUsefulAnswerID
    return this.responseTemplate
  }

  renderLong (feedback) {
    this.responseTemplate.response_status = 'completed'
    // Extract the URL
    this.responseTemplate.pages[0].questions[0].answers[0].text = feedback.url
    // Extract if the feedback was positive
    this.responseTemplate.pages[0].questions[1].answers[0].choice_id = feedback.useful
      ? this.usefulAnswerID
      : this.notUsefulAnswerID

    // Extract the email
    if (feedback.email) {
      this.emailTemplate.answers[0].text = feedback.email
      this.responseTemplate.pages[0].questions.push(this.emailTemplate)
    }
    // Extract the name
    if (feedback.name) {
      this.nameTemplate.answers[0].text = feedback.name
      this.responseTemplate.pages[0].questions.push(this.nameTemplate)
    }

    // Extract the note
    this.noteTemplate.answers[0].text = feedback.note
    this.responseTemplate.pages[0].questions.push(this.noteTemplate)
    return this.responseTemplate
  }
}
