require('dotenv').config();
const {
  createEmbedError,
  createUnknowCommandError,
} = require('../utils/errorUtils');
const { consoleColor, prefix } = require('../utils/utils');
const onPrivateMessage = require('../private-message/message');

async function onMessage(message, client) {
  if (message.channel.name === undefined) {
    await onPrivateMessage(message, client);
    return;
  }

  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();

  let clientCommand = client.commands.get(command);

  if (!clientCommand) {
    clientCommand = client.commands.get(client.aliases.get(command));
  }

  console.info(
    consoleColor('info', `▶️ ${message.author.username} ran`),
    consoleColor('danger', prefix + command),
    consoleColor('info', `at ${new Date().toLocaleString()}`),
  );

  try {
    if (clientCommand) {
      await clientCommand.run(client, message, args);

      if (clientCommand.autoMessageDeletion) {
        await message.delete();
      }
    } else {
      await message.delete();
      const warningMessage = await message.channel.send(
        createUnknowCommandError(prefix, command),
      );

      setTimeout(() => {
        warningMessage.delete();
      }, 5000);
    }
  } catch (error) {
    console.info(
      consoleColor('danger', '⭕️ Error : '),
      error.custom ? error.title : error.stack,
    );
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
