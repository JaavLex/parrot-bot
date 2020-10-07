const {Client, RichEmbed, Collection} = require('discord.js');
const config = require('./config.json');

const client = new Client();

client.once('ready', () => {
  console.info('The bot is running.');
});

client.login(config.token);
