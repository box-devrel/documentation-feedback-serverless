# Serverless Feedback Component for SurveyMonkey

### Prerequisites

Install Node 8.10 and yarn:

```sh
nvm install 8.10
nvm use 8.10
npm install -g yarn
yarn install
```

Install serverless CLI:

```sh
npm install -g serverless
sls login
sls config credentials --provider aws --key [AWS_KEY] --secret [AWS_SECRET] -o
```

### Deployment

#### Production

Production is pushed to AWS using Travis.

#### "Staging"

You can test a staging environment by deploying the dev stage to AWS.

```sh
yarn deploy # deploys to AWS using the DEV stage
```

This will output a URL in the form of:

```sh
https://[ID].execute-api.us-east-1.amazonaws.com/[env]/feedback
```

### Testing locally

This does post to an actual response!

```sh
yarn invoke:local:short # writes a short yes/no response

# for the next two, you will need to update the short.update.json
# and long.json samples with the ID from the response above
yarn invoke:local:update # updates the yes/no response
yarn invoke:local:long # updates the yes/no response with name, email, and note
```
