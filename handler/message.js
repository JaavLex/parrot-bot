require('dotenv').config();
const { ReactionUserManager } = require('discord.js');
const { prefix } = require('../config.json');
const { createEmbedError } = require('../utils/errorUtils');

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
    '♨️\x1b[31m',
    currentPrefix + command,
    '\x1b[36m at ' + new Date().toLocaleString(),
    '\x1b[0m',
  );

  try {
    if (clientCommand) {
      await clientCommand.run(client, message, args);

      if (clientCommand.autoMessageDeletion) {
        await message.delete();
      }
    } else {
      const warningMessage = await message.channel.send(
        `⚠️ Unknow command **${currentPrefix}${command}**`,
      );

      setTimeout(() => {
        warningMessage.delete();
      }, 4000);
    }
  } catch (error) {
    if (error.custom) {
      const errorMessage = await message.channel.send(createEmbedError(error));

      if (error.autoMessageDeletion) {
        setTimeout(() => {
          errorMessage.delete();
        }, 4000);
      }
      return;
    }

    if (process.env.BOT_ENV === 'development') {
      message.channel.send(`⚠️ Error : ${String(error)}`);
    } else {
      message.channel.send(`⚠️ An error has been encountered. Call an admin.`);
    }
  }
}

module.exports = onMessage;
