const Handler = require('../../src/handlers/short').default
const handlerFunction = require('../../src/handlers/short').handler

test('Handler to be a class', () => {
  expect(Handler).not.toBeUndefined()
  expect(handlerFunction).not.toBeUndefined()
  expect(Handler.constructor).not.toBeUndefined()
  expect(Handler).toBeInstanceOf(Object)
  expect(handlerFunction).toBeInstanceOf(Function)
})

describe('.handle() - new', () => {
  test('without a body', () => {
    const handler = new Handler()
    handler.http.postResponse = jest.fn().mockImplementation(() => Promise.resolve({
      id: '123'
    }))

    const response = handler.handle({
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
      expect(handler.http.postResponse).toHaveBeenCalledWith({ pages: [{ id: '47129534', questions: [{ answers: [{ text: 'URL' }], id: '164341787' }, { answers: [{ choice_id: '1155115697' }], id: '164341788' }] }], response_status: 'partial' })
    })
  })

  test('with a body', () => {
    const handler = new Handler()
    handler.http.postResponse = jest.fn().mockImplementation(() => Promise.resolve({
      id: '123'
    }))

    const response = handler.handle({
      body: JSON.stringify({
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
      expect(handler.http.postResponse).toHaveBeenCalledWith({ pages: [{ id: '47129534', questions: [{ answers: [{ text: 'URL' }], id: '164341787' }, { answers: [{ choice_id: '1155115697' }], id: '164341788' }] }], response_status: 'partial' })
    })
  })
})

describe('.handle() - update', () => {
  test('without a body', () => {
    const handler = new Handler()
    handler.http.putResponse = jest.fn().mockImplementation(() => Promise.resolve({
      id: '123'
    }))

    const response = handler.handle({
      id: '123',
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
      expect(handler.http.putResponse).toHaveBeenCalledWith('123', { pages: [{ id: '47129534', questions: [{ answers: [{ text: 'URL' }], id: '164341787' }, { answers: [{ choice_id: '1155115697' }], id: '164341788' }] }], response_status: 'partial' })
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
      expect(handler.http.putResponse).toHaveBeenCalledWith('123', { pages: [{ id: '47129534', questions: [{ answers: [{ text: 'URL' }], id: '164341787' }, { answers: [{ choice_id: '1155115697' }], id: '164341788' }] }], response_status: 'partial' })
    })
  })
})
