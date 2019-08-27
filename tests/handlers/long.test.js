const Handler = require('../../src/handlers/long').default
const handlerFunction = require('../../src/handlers/long').handler

test('Handler to be a class', () => {
  expect(Handler).not.toBeUndefined()
  expect(handlerFunction).not.toBeUndefined()
  expect(Handler.constructor).not.toBeUndefined()
  expect(Handler).toBeInstanceOf(Object)
  expect(handlerFunction).toBeInstanceOf(Function)
})

describe('.handle()', () => {
  test('without a body', () => {
    const handler = new Handler()
    handler.http.putResponse = jest.fn().mockImplementation(() => Promise.resolve({
      id: '123'
    }))

    const response = handler.handle({
      id: '123',
      name: 'Name',
      email: 'Email',
      note: 'Note',
      url: 'URL',
      useful: false
    })

    expect.assertions(2)

    return response.then((res) => {
      expect(res).toEqual({
        body: '{"id":"123"}',
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*'
        },
        statusCode: 201
      })
      expect(handler.http.putResponse).toHaveBeenCalledWith('123', { pages: [{ id: '47129534', questions: [{ answers: [{ text: 'URL' }], id: '164341787' }, { answers: [{ choice_id: '1155115697' }], id: '164341788' }, { answers: [{ text: 'Email' }], id: '164341790' }, { answers: [{ text: 'Name' }], id: '164341789' }, { answers: [{ text: 'Note' }], id: '164341791' }] }], response_status: 'completed' })
    })
  })

  test('with a body', () => {
    const handler = new Handler()
    handler.http.putResponse = jest.fn().mockImplementation(() => Promise.resolve({
      id: '123'
    }))

    const response = handler.handle({
      body: JSON.stringify({
        id: '123',
        name: 'Name',
        email: 'Email',
        note: 'Note',
        url: 'URL',
        useful: false
      })
    })

    expect.assertions(2)

    return response.then((res) => {
      expect(res).toEqual({
        body: '{"id":"123"}',
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*'
        },
        statusCode: 201
      })
      expect(handler.http.putResponse).toHaveBeenCalledWith('123', { pages: [{ id: '47129534', questions: [{ answers: [{ text: 'URL' }], id: '164341787' }, { answers: [{ choice_id: '1155115697' }], id: '164341788' }, { answers: [{ text: 'Email' }], id: '164341790' }, { answers: [{ text: 'Name' }], id: '164341789' }, { answers: [{ text: 'Note' }], id: '164341791' }] }], response_status: 'completed' })
    })
  })
})
