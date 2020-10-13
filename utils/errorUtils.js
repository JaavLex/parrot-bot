const createEmbed = require('./disocrdUtils');

/**
 * Function to create Embed easier.
 *
 * @param {{title: string, error: string, solution: string}} error The color of the embed
 * @return {MessageEmbed} A Discord Embed
 */
function createEmbedError(error) {
  const embed = createEmbed('#c0392b', ' ⚠️ ' + error.title);

  if (error.error) {
    embed.addField('🔴 Error', '```\n' + error.error + '\n```');
  }

  if (error.solution) {
    embed.addField('🟢 Solution', '```\n' + error.solution + '\n```');
  }

  return embed;
}

/**
 * Function to create Embed easier.
 *
 * @param {string} title The color of the embed
 * @param {string} error The color of the embed
 * @param {string} solution The color of the embed
 * @return {MessageEmbed} A Discord Embed
 */
function createError(title, error, solution) {
  return { custom: true, title, error, solution };
}

exports.createError = createError;
exports.createEmbedError = createEmbedError;
