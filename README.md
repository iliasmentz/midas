# This is Midas!

The famous [King Midas](https://en.wikipedia.org/wiki/Midas) is popularly remembered in Greek mythology
for his ability to turn everything he touched into gold.

Unfortunately, that's not the case here 😅.

Midas is a service responsible for processing payments.
In particular, Midas provides an HTTP API that:
- receives card details and returns a token
- processes transactions using this token against a payment processor.

## How to install

```
git clone https://github.com/iliasmentz/midas.git
```

## How to run the app

#### On your local machine

```
cp .env.sample .env
npm run start:dev
```

#### On docker

```
docker-compose up --build api
```

## Stack



[<img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg" alt="node" height="40">](https://nodejs.org/en/) &ensp;
[<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/540px-Npm-logo.svg.png" alt="npm" height="40">](https://www.npmjs.com/) &ensp;
[<img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" alt="typescript" height="40">](https://www.typescriptlang.org/) &ensp;
[<img src="https://seeklogo.com/images/J/jest-logo-F9901EBBF7-seeklogo.com.png" alt="jest" height="40">](https://jestjs.io/) &ensp;
[<img src="https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-icon-light.png" alt="prettier" height="40">](https://prettier.io/) &ensp;
[<img src="https://www.aldakur.net/wp-content/uploads/2017/03/docker-logo.png" alt="docker" height="40">](https://docker.com) &ensp;
