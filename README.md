<div align="center">

<a href="https://www.tryunearth.com">
  <img src="https://raw.githubusercontent.com/cedricium/unearth/5a355e2e743eefd49ffed2f53537dbc81ef8a1ad/client/public/og-image.png" width="auto" height="360" />
</a>

### It's like Timehop for Reddit saves.

</div>

This is the main monorepo of Unearth. This repository contains the code for the
backend server, frontend client, and various scripts consumed by cron jobs.

## What Is Unearth?

### Background

Reddit is a goldmine of information—with posts and comments ranging in emotion
from funny and lighthearted, to straight-to-the-point and motivational, to
everything in-between and beyond. It's not uncommon for Redditors to save these
things, finding value in them and wishing to have a reference to it later on.

But saving things leads to a couple of problems. For starters, the number of
saves allowed on Reddit is limited and there is the chance of previous saves
being overwritten when that limit is reached. The other issue is many Redditors
save things but forget to ever go back and view said things. [Read more about why
Reddit's save functionality is subpar](https://cedric.tech/blog/reddits-save-functionality-sucks/).

### Vision

The current tools provided by Reddit are insufficient at helping Redditors manage
and rediscover their saved things.

**Unearth aims to be the best service to help Redditors rediscover the things
they have saved through the use of active reminders.** By leveraging content
resurfacing to create personalized emails with users' saved things, we will be
able to help more Redditors take control of their saved content and evoke a
sense of nostalgia as they are reminded of the posts and comments they have
saved during their time on Reddit.

### Status

Unearth is currently still in development but the minimum viable product (MVP)
is completed. [Feel free to try Unearth today](https://www.tryunearth.com).

## Contributing

### Ground Rules

#### Reporting a bug or discussing a feature idea

If you found a technical bug on Unearth or have ideas for features we should
implement, the issue tracker is the best place to share your ideas. ([click here
to open a new issue](https://github.com/cedricium/unearth/issues/new))

#### Fixing a bug or implementing a new feature

If you find a bug on Unearth and open a PR that fixes it we'll review it as soon
as possible.

If you want to implement a new feature, open an issue first to discuss what it'd
look like to ensure it fits in our roadmap.

Want to fix a bug or implement an agreed-upon feature? Great, jump to the
[local setup instructions](#first-time-setup)!

### Codebase

#### Technologies

With the ground rules out of the way, let's talk about the core architecture
of this monorepo:

- **Full-stack JavaScript:** we use Node.js to power our servers, and React to
  power our frontend apps. Almost all of the code you'll touch in this codebase
  will be JavaScript.

- **Background Jobs:** background jobs are the bread-and-butter of Unearth—they
  are what send the emails at the correct frequency. The jobs themselves execute
  scripts which can be found in the `jobs/` directory.

Here is a list of all the big technologies used in this project:

- **React:** frontend client app

- **Express.js:** RESTful API server

- **SocketIO:** WebSocket endpoint for bi-directional communication between
  client and server

- **PostgreSQL:** data storage

- **Heroku/Netlify:** platform hosting

#### Folder structure

```text
unearth/
├── api               # RESTful API endpoints
├── cleint            # frontend SPA
├── database          # config file, migrations, and seeds for postgres db
├── docs              # coming soon!
├── email-templates   # Pug.js email templates
├── jobs              # executed using cron
└── services          # business logic for sending emails and connecting to Reddit
```

### First-time Setup

The first step to running Unearth locally is downloading the code by cloning
the repository:

```sh
$ git clone https://github.com/cedricium/unearth.git
```

#### Installation

Unearth uses a variety of technologies that need to be installed on your local
machine before development can begin. The general installation steps are as
follows:

1. **Install PostgreSQL:** see
   [the PostgreSQL documentation](https://www.postgresql.org/download/) for
   instructions on installing it with your OS
2. **Install yarn:** we use [yarn](https://yarnpkg.com/en/docs/install) to
   handle our JavaScript dependencies
3. **Install the dependencies:** finally, install the dependencies for the back-
   and front-end projects (`$ yarn install` in both the root and `client/`
   directories)

#### Migrating the database

When you first download the code and want to run it locally you have to migrate
the database and seed it with test data. First, ensure postgres is up and
running on your machine.

Then in a new terminal tab or window, run these commands:

```sh
$ yarn run db:migrate
$ yarn run db:seed
```

There's also a shortcut for dropping, migrating and seeding the database:

```sh
$ yarn run db:reset
```

#### Setup the secrets

In order to get all components of the app working, there are several secrets
needing to be configured. To get those set up, copy the provided example secrets
file to the real location:

```sh
$ cp .env.example .env
```

> Note: this will need to be done in both the root and the `client/` directories

Now you're ready to run the app locally and start development!

### Running the App Locally

#### Background services

Whenever you want to run Unearth locally it is advised you have postgres running
in the background. First start postgres then make sure you have migrated and
seeded the database.

#### Start the server

No matter what you're trying to work on, you'll want to have the API running, so
start that in a background tab:

```sh
$ yarn run dev
```

#### Develop the client app

To develop the frontend and web UI, first:

```sh
$ cd client
```

then start the app:

```sh
$ yarn start
```

#### Edit email templates

At the time of this writing, all of the email templates have been written using
[Pug.js](https://pugjs.org/), so some familiarity with that would be beneficial.

When developing locally, emails are not actually sent; rather, they go through
[Ethereal](https://ethereal.email/), a fake SMTP service that displays the
rendered emails in the browser. This is helpful when making changes to the email
templates and you want to preview said changes.

Visit the Nodemailer and Ethereal documentation for more information:

- **Nodemailer:** https://nodemailer.com/

- **Ethereal:** https://ethereal.email/

> Note: if something did not work or you ran into any issues during the setup
> process, please submit PRs to improve this doc and keep it up to date!

## License

MIT, see the [LICENSE](./LICENSE) file.
