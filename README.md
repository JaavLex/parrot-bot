# parrot-bot

A multifonctionnal discord bot, features will be added as the bot is being
developped !

Current Project Board https://github.com/TacticsCH/parrot-bot/projects/2

## console protocole

`console.info` : info utile for debug

`console.log` : test log

## package.json scripts

`npm start` : run the server

`npm dev` : run the server with nodemon

## command object parameters

- name
- aliases
- category: category of command (match with folder)
- description
- usage: Exmeple of usage for the command
- autoMessageDeletion: If true, message will be automatically be destroyed
- customDescription: If message have custom **markdown** description
- run: Function called when command is running

## error gestion

`throw` error is catched at top level and create a beautiful and generic error.

If you want create an error :

```js
const { createError } = require('./errorUtils');

throw createError(
  'Title',
  'Error descritpion', // optional
  'Error solution (exemple of good command)', // optional
);
```

## - .env

BOT_ENV= development | production DISCORD_TOKEN=You're discord bot Token
DEV_PREFIX=Custom prefix for dev
