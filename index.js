const {
    Client,
    RichEmbed,
    Collection
} = require("discord.js");
const client = new Discord.Client();

client.once('ready', () => {
  console.log('The bot is running.');
});

client.login('your-token-goes-here');
