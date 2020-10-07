const {Client, RichEmbed, Collection} = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const {token} = require('./secrets.json');
const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');
const handler = require(`./handler/handler.js`);

handler();

client.on('message', async message => {
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;

  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g)
    .shift()
    .toLowerCase();

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
