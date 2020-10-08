const {
  Client,
  RichEmbed,
  Collection
} = require('discord.js');
const {
  prefix
} = require('./config.json');
const {
  token
} = require('./secrets.json');
const handler = require(`./handler/handler.js`);
const fs = require('fs');

const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');

handler(client);

client.on('message', async message => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g)

  let command = client.commands.get(args);

  if (!command) {
    command = client.commands.get(client.aliases.get(args));
  }

  if (command) command.run(client, message, args);
});

client.once('ready', () => {
  console.info('The bot is running.');
});

client.login(token);