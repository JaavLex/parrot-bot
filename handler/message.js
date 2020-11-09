require('dotenv').config();
const { consoleColor, prefix } = require('../utils/utils');
const onPrivateMessage = require('../private-message/message');
const {
  checkAuthorPermissions,
  createMissingPermissionsMessage,
} = require('../utils/adminUtils');
const {
  onError,
  getArgsAndCommand,
  getClientCommand,
  onUnknowMessage,
} = require('../utils/messageUtils');

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

  // client run unknow command
  if (!clientCommand) {
    await onUnknowMessage(message, command);
    return;
  }

  try {
    // if user need permissions before run command
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

module.exports = onMessage;
