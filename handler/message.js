require('dotenv').config();
const { prefix } = require('../config.json');

const currentPrefix = process.env.DEV_PREFIX || prefix;

async function onMessage(message, client) {
  if (message.author.bot || !message.content.startsWith(currentPrefix)) return;

  const args = message.content.slice(currentPrefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();

  let clientCommand = client.commands.get(command);

  if (!clientCommand) {
    clientCommand = client.commands.get(client.aliases.get(command));
  }

  console.info(
    '\x1b[36m',
    `▶️ ${message.author.username} run`,
    '⭕️\x1b[31m',
    currentPrefix + command,
    '\x1b[36m at ' + new Date().toLocaleString(),
    '\x1b[0m',
  );

  if (clientCommand) {
    clientCommand.run(client, message, args);
  }
}

module.exports = onMessage;
