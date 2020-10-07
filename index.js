const {
  Client,
  RichEmbed,
  Collection
} = require('discord.js');
const config = require('./config.json');
const secrets = require('./secrets.json');
const fs = require("fs");
const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
const handler = require(`./handler/handler.js`)(client);




client.on("message", async message => {
  const prefix = config.prefix;

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const argsLowerCase = args.shift().toLowerCase();

  if (argsLowerCase.length === 0) return;

  let command = client.commands.get(argsLowerCase);
  if (!command) command = client.commands.get(client.aliases.get(argsLowerCase));

  if (command)
    command.run(client, message, args);
});

client.once('ready', () => {
  console.info('The bot is running.');
});

client.login(secrets.token);