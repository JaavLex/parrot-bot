const { createEmbedError } = require('./errorUtils');
const { prefix } = require('./utils');

/**
 * To create error object sended to `createEmbedError`
 *
 * @param {string} pref command prefix
 * @param {string} command command
 * @return {MessageEmbed} A Discord Embed
 */
function createUnknowCommandError(pref, command) {
  return createEmbedError({
    title: 'Unknown command',
    description: `${pref}${command} is unknown`,
    solution: `Type ${pref}help to see available commands.`,
  });
}

async function onUnknowMessage(message, command) {
  try {
    await message.delete();
    const warningMessage = await message.channel.send(
      createUnknowCommandError(prefix, command),
    );

    setTimeout(() => {
      warningMessage.delete();
    }, 5000);
  } catch (e) {
    console.info('Error :', e);
  }
}

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

module.exports = {
  onError,
  getArgsAndCommand,
  getClientCommand,
  onUnknowMessage,
};
