const { createEmbed } = require('./discordUtils');
const { createMdBlock } = require('./utils');

/**
 * Function to create error embed easier.
 *
 * @param {{title: string, description: string, solution: string}} error error
 * @return {MessageEmbed} A Discord Embed
 */
function createEmbedError(error) {
  const embed = createEmbed('#c0392b', ` ⚠️ ${error.title}`);

  if (error.description) {
    embed.addField('🔴 Error', createMdBlock(error.description));
  }

  if (error.solution) {
    embed.addField('🟢 Solution', createMdBlock(error.solution));
  }

  return embed;
}

/**
 * To create error object sended to `createEmbedError`
 *
 * @param {string} title error's title
 * @param {string} description error's description
 * @param {string} solution error's solution
 * @param {boolean} autoMessageDeletion true if error need to be autoDelete
 * @return {{custom: boolean, title: string, description: string, solution: string, autoDeleteError: boolean}}
 */
function createError(title, description, solution, autoMessageDeletion) {
  return { custom: true, title, description, solution, autoMessageDeletion };
}

/**
 * To create error object sended to `createEmbedError`
 *
 * @param {string} prefix command prefix
 * @param {string} command command
 * @return {MessageEmbed} A Discord Embed
 */
function createUnknowCommandError(prefix, command) {
  return createEmbedError({
    title: 'Unknown command',
    description: `${prefix}${command} is unknown`,
    solution: `Type ${prefix}help to see available commands.`,
  });
}

exports.createError = createError;
exports.createEmbedError = createEmbedError;
exports.createUnknowCommandError = createUnknowCommandError;
