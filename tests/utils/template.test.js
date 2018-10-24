const Template = require('../../src/utils/template').default

test('Template to be a class', () => {
  expect(Template).not.toBeUndefined()
  expect(Template.constructor).not.toBeUndefined()
  expect(Template).toBeInstanceOf(Object)
})

describe('.renderShort()', () => {
  test('with a positive feedback value', () => {
    let template = new Template()
    let answer = template.renderShort({
      useful: true,
      url: 'https://example.com/foo/bar'
    })

    expect(answer.pages.length).toBe(1)
    expect(answer.pages[0].questions.length).toBe(2)
    expect(answer.pages[0].questions[0].answers[0].text).toEqual('https://example.com/foo/bar')
    expect(answer.pages[0].questions[1].answers[0].choice_id).toEqual(template.usefulAnswerID)
  })

  test('with a negative feedback value', () => {
    let template = new Template()
    let answer = template.renderShort({
      useful: false,
      url: 'https://example.com/foo/bar'
    })

    expect(answer.pages.length).toBe(1)
    expect(answer.pages[0].questions.length).toBe(2)
    expect(answer.pages[0].questions[0].answers[0].text).toEqual('https://example.com/foo/bar')
    expect(answer.pages[0].questions[1].answers[0].choice_id).toEqual(template.notUsefulAnswerID)
  })
})

describe('.renderLong()', () => {
  test('with a positive feedback value', () => {
    let template = new Template()
    let answer = template.renderLong({
      useful: true,
      url: 'https://example.com/foo/bar'
    })

    expect(answer.pages.length).toBe(1)
    expect(answer.pages[0].questions.length).toBe(3)
    expect(answer.pages[0].questions[0].answers[0].text).toEqual('https://example.com/foo/bar')
    expect(answer.pages[0].questions[1].answers[0].choice_id).toEqual(template.usefulAnswerID)
    expect(answer.pages[0].questions[2].answers[0]).toHaveProperty('text')
    expect(answer.pages[0].questions[2].answers[0].text).toBeUndefined()
  })

  test('with a negative feedback value', () => {
    let template = new Template()
    let answer = template.renderLong({
      useful: false,
      url: 'https://example.com/foo/bar'
    })

    expect(answer.pages.length).toBe(1)
    expect(answer.pages[0].questions.length).toBe(3)
    expect(answer.pages[0].questions[0].answers[0].text).toEqual('https://example.com/foo/bar')
    expect(answer.pages[0].questions[1].answers[0].choice_id).toEqual(template.notUsefulAnswerID)
    expect(answer.pages[0].questions[2].answers[0].text).toBeUndefined()
  })

  test('with an email value', () => {
    let answer = new Template().renderLong({
      useful: false,
      url: 'https://example.com/foo/bar',
      email: 'foo@bar.com'
    })

    expect(answer.pages[0].questions.length).toBe(4)
    expect(answer.pages[0].questions[2].answers[0].text).toEqual('foo@bar.com')
  })

  test('with an name value', () => {
    let answer = new Template().renderLong({
      useful: false,
      url: 'https://example.com/foo/bar',
      name: 'Name'
    })

    expect(answer.pages[0].questions.length).toBe(4)
    expect(answer.pages[0].questions[2].answers[0].text).toEqual('Name')
  })

  test('with all data', () => {
    let answer = new Template().renderLong({
      useful: false,
      url: 'https://example.com/foo/bar',
      name: 'Name',
      email: 'Email',
      note: 'Note'
    })

    expect(answer.pages[0].questions.length).toBe(5)
    expect(answer.pages[0].questions[2].answers[0].text).toEqual('Email')
    expect(answer.pages[0].questions[3].answers[0].text).toEqual('Name')
    expect(answer.pages[0].questions[4].answers[0].text).toEqual('Note')
  })
})
