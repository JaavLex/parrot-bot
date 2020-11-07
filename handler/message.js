require('dotenv').config();
const {
  createEmbedError,
  createUnknowCommandError,
} = require('../utils/errorUtils');
const { consoleColor, prefix } = require('../utils/utils');
const onPrivateMessage = require('../private-message/message');
const {
  checkAuthorPermissions,
  createMissingPermissionsMessage,
} = require('../utils/adminUtils');

async function onMessage(message, client) {
  if (message.channel.name === undefined) {
    await onPrivateMessage(message, client);
    return;
  }
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const { args, command } = getArgsAndCommand(message);
  const clientCommand = getClientCommand(client, command);

  console.info(
    consoleColor('info', `▶️ ${message.author.username} ran`),
    consoleColor('danger', prefix + command),
    consoleColor('info', `at ${new Date().toLocaleString()}`),
  );

  if (!clientCommand) {
    await message.delete();
    const warningMessage = await message.channel.send(
      createUnknowCommandError(prefix, command),
    );

    setTimeout(() => {
      warningMessage.delete();
    }, 5000);

    return;
  }

  try {
    if (clientCommand.permissions) {
      const missingPermissions = checkAuthorPermissions(
        clientCommand.permissions,
        message.guild.members.cache.get(message.author.id),
      );

      if (missingPermissions.length !== 0) {
        await message.channel.send(
          createMissingPermissionsMessage(missingPermissions),
        );
        return;
      }
    }

    await clientCommand.run(client, message, args);

    if (clientCommand.autoMessageDeletion) {
      await message.delete();
    }
  } catch (error) {
    console.info(
      consoleColor('danger', '⭕️ Error : '),
      error.custom ? error.title : error.stack,
    );
    onError(error, message);
  }
}

// * UTILS
// * UTILS
// * UTILS
// * UTILS

function getClientCommand(client, command) {
  return (
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command))
  );
}

function getArgsAndCommand(message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  return { args, command };
}

async function onError(error, message) {
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
    return;
  }

  message.channel.send(`⚠️ An error has been encountered. Call an admin.`);
}

module.exports = onMessage;
