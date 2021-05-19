# This is Midas!

The famous [King Midas](https://en.wikipedia.org/wiki/Midas) is popularly remembered in Greek mythology
for his ability to turn everything he touched into gold.

Unfortunately, that's not the case here 😅.

Midas is a service responsible for processing payments.
In particular, Midas provides an HTTP API that:
- receives card details and returns a token
- processes transactions using this token against a payment processor.

## How to run the app ⚙️

### Requirements 📋

- npm >= 7.6
- node >= 14.8
- Docker >= 20.10
- Docker Compose > =3.7

### Steps 🪜

Goes without saying, but clone the repo 😅
```
git clone https://github.com/iliasmentz/midas.git
```

Copy default project settings:
```shell
$ cp .docker-compose.env.sample .docker-compose.env
```

If we want stripe integration to work, we need to override these values in the `.docker-compose.env`:
```dotenv
STRIPE_BASE_URL=https://api.stripe.com
STRIPE_API_KEY=a-real-stripe-api-key
```

You are good to go 🚀, just run:
```shell
docker-compose up
```

### Some curl request to have fun 💻

```shell
curl --location --request POST 'localhost:3000/cards/tokenize' \
--header 'Content-Type: application/json' \
--data-raw '{
    "expirationMonth": 2,
    "expirationYear": 2025,
    "number": "4242424242424242",
    "cvc": 322
  }'
```

```shell
curl --location --request POST 'localhost:3000/sales' \
--header 'Content-Type: application/json' \
--data-raw '{
    "token": "<the-returned-token>",
    "processor": "stripe",
    "amount": 10.0,
    "currency": "usd",
    "description": "This is a test sales, thanks for choosing us",
    "email": "iliasmentz@gmail.com"
  }'
```
### The error object 💣

The API errors are the same through the whole app. The error body contains:
- statusCode: the HTTP status code _(might be replaced with an internal error code in the future)_
- error: a text describing the meaning of HTTP status. It might be the providers' one in case it's a client validation error.
- message: user-friendly message for the client to understand the error better.

## How do I know this will work? 🤔

Well actually with this repo there is an integrated CI using [CircleCI](https://circleci.com/).
So the moment you push a branch, I've got you covered 🤜🤛.

If you have trust issues however here is what you can do:

Run the lint:
```shell
npm run lint
```

Run the unit tests:
```shell
npm run test
```

Run the functional tests:
```shell
./scripts/functional-test.sh
```
_Functional tests mock the stripe integration using a mock server so please be sure that you have the `STRIPE_BASE_URL` equal
to `http://localhost:9000` (where the mock server starts)_

## How can I add a new Payment Processor? 🤓

That's easy-peasy.
- In the package `src/sales/actions/processors` add a new package with the processor's name.
- In that package write the implementation of the integration and make sure you expose a class that
  implements the `PaymentProcessor` interface.
- In the `src/sales/actions/processors/index.ts` add to `PAYMENTS_PROCESSORS` list your exposed class.
- Make sure you write some tests about that ⚠️.

## Caveats / Next steps ⌛️

### Authentication 🔐

This is not implemented as the app is obviously not ready for production use. However, there is a dummy
authentication middleware that returns a user_id for that request. If that gets implemented, **we need to add a check that
the token/cards belong to the same user that requests a new sale**.

### Idempotency key

We need to implement an idempotency check, so we won't execute the same sale twice. This can be easily implemented by setting
a new header on the `/sale` requests API and provide it to the processors that support it as well.

### Retry mechanism

We need to implement a mechanism that performs an exponential retry in case the integrated payment processors face any
technical difficulties. There are many plugins that support something like this, but we should be careful and use them
only on the payment processor's server error and not to invalid/bad requests.

### Enhance processors with additional operations

In case we decide we want to enhance the system with more functionalities we could easily add some new methods on the
`PaymentProcessor` interface and implement those abilities on each processor.

### API documentation

We need to add an API docs mechanism to ensure the clients can easily understand the API and its behaviors.
We could use Swagger or JS Docs for that. This will require adding some JS Docs in the codebase as well, but tbh I
prefer the code to explain what's going on and not the comments 😇.

### Deployment

There is already a file called `cloudbuild.yaml` inside the `infra` directory. This can be used to deploy the app on GCP.
We just need to create a project on Google Cloud Console and follow the instructions on how we can
[deploy an app with Cloud Run](https://cloud.google.com/build/docs/deploying-builds/deploy-cloud-run)

## Stack

[<img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg" alt="node" height="40">](https://nodejs.org/en/) &ensp;
[<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/540px-Npm-logo.svg.png" alt="npm" height="40">](https://www.npmjs.com/) &ensp;
[<img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" alt="typescript" height="40">](https://www.typescriptlang.org/) &ensp;
[<img src="https://seeklogo.com/images/J/jest-logo-F9901EBBF7-seeklogo.com.png" alt="jest" height="40">](https://jestjs.io/) &ensp;
[<img src="https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-icon-light.png" alt="prettier" height="40">](https://prettier.io/) &ensp;
[<img src="https://www.aldakur.net/wp-content/uploads/2017/03/docker-logo.png" alt="docker" height="40">](https://docker.com) &ensp;
