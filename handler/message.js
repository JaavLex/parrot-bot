require('dotenv').config();
const { prefix } = require('../config.json');

const currentPrefix = process.env.DEV_PREFIX || prefix;

async function onMessage(message, client) {
  if (message.author.bot || !message.content.startsWith(currentPrefix)) return;

  const args = message.content.slice(currentPrefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();

  console.log(`💣 ${message.author.username} run ${currentPrefix}${command}`);

  let clientCommand = client.commands.get(command);

  if (!clientCommand) {
    clientCommand = client.commands.get(client.aliases.get(command));
  } else {
    clientCommand.run(client, message, args);
  }
}

module.exports = onMessage;
