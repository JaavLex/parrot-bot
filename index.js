// load .env variables
require('dotenv').config();
const fs = require('fs');
const { Client, Collection } = require('discord.js');
const { prefix } = require('./utils/utils');

const handler = require(`./handler/handler.js`);
const onMessage = require('./handler/message');
const { consoleColor } = require('./utils/utils');

const discordToken = process.env.DISCORD_TOKEN;
const environment = process.env.BOT_ENV;

if (!discordToken) throw new Error('⭕️ .env: DISCORD_TOKEN is missing.');
if (!environment) throw new Error('⭕️ .env: BOT_ENV is missing.');

console.info(
  '\n\n\n\n',
  consoleColor('logger', `⌛ bot starting in "${environment}" environment...`),
);

const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');

handler(client);

client.on('message', message => onMessage(message, client));

client.on('ready', () => {
  console.info(consoleColor('success', '✨ The bot is running.'));
  console.info(
    consoleColor(
      'subinfo',
      `ℹ️  Client info :
  - Username  ${client.user.tag}
  - Id        ${client.user.id}
  - Prefix    ${consoleColor('danger', prefix)}\n`,
    ),
  );

  if (environment === 'test') {
    // exit for test be finish when bot running !
    process.exit(0);
  }
  client.user.setActivity(`🦜 Squawk! ${prefix}help`, 'PLAYING');
});

client.login(discordToken);
