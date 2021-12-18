# Referral App

This app provides a webapp to manage internal contacts fueled by a backend REST API.

Users can view a list of entries representing contacts.

## Overview

This app is written in Typescript using [Express](https://expressjs.com/) for the backend API
and [React](https://reactjs.org/) for the frontend.

### API

The backend logic is implemented as a REST API, located at `./apps/api`. A local sqlite relational database is used to
store the data and [Prisma](https://www.prisma.io/) is used to manage the schema and access the db.

### Webapp

The webapp code is located at `./apps/webapp`. It fetches data from the API and displays the referrals in a user
interface. The app uses [Material UI](https://material-ui.com/) as UI component library.

This project was generated using [Nx](https://nx.dev).

## Local Development Setup

### Prerequisites

* [NodeJS](https://nodejs.org/en/), latest LTS version recommended
* [Yarn](https://classic.yarnpkg.com/lang/en/) package manager, version 1.22.x or newer

Tip: a nice way to install and manage various versions of NodeJS on your development machine
is [NVM](https://github.com/nvm-sh/nvm#installing-and-updating).

On a Mac you can use [Brew](https://brew.sh/) to install all prerequisites with this command:

```shell
brew install nvm yarn
```

Note: You will get prompted with one additional manual task to finish the NVM installation.

### Setup and Run

#### Set and install Node version (when using NVM):

```shell
nvm install
node --version
```

#### Install dependencies:

```shell
yarn install
```

#### Init Database and run initial migration:

```shell
yarn prisma migrate deploy
```

This command initialises the SQLite database and generates the db client.

#### Start the API service:

```shell
yarn start api
```

#### Start the webapp (in a separate terminal):

```shell
yarn start webapp
```

#### Run Tests

```shell
yarn test api       # runs the api tests
yarn test webapp    # runs the webapp tests
```

Open [localhost:4200](http://localhost:4200) in your browser, you should see the webapp

Hint: to reset the database to its default state, run this from the root of the project:

```shell
rm ./apps/api/prisma/dev.db*  # removes SQLite files
yarn prisma migrate deploy    # rebuild db schema
```
