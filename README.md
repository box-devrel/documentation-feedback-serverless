# Serverless Feedback Component for SurveyMonkey

### Prerequisites

Install Node 8.10 and yarn:

```sh
nvm install 8.10
nvm use 8.10
npm install -g yarn
yarn install
```

### Development

```sh
yarn test --watch # to watch all the tests
yarn lint --fix # to run the linter and fix the basics
```

### Deployment

Do not deploy from a local device. Instead let Travis do all deployment.

The `master` branch is automatically deployed as the `prod` stage, and the
`develop` branch is deployed as the `dev` stage.

Currently, the URLs for both these stages are:

* `prod`: `https://hubzs7tts2.execute-api.us-east-1.amazonaws.com/prod`
* `dev`: `https://fkzpk1kpt3.execute-api.us-east-1.amazonaws.com/dev`

### Testing locally

This does post to an actual response!

```sh
yarn invoke:local:short # writes a short yes/no response

# for the next two, you will need to update the short.update.json
# and long.json samples with the ID from the response above
yarn invoke:local:update # updates the yes/no response
yarn invoke:local:long # updates the yes/no response with name, email, and note
```

### Testing remotely

```sh
yarn invoke:short # writes a short yes/no response

# for the next two, you will need to update the short.update.json
# and long.json samples with the ID from the response above
yarn invoke:update # updates the yes/no response
yarn invoke:long # updates the yes/no response with name, email, and note
```
