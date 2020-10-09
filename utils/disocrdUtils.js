const { MessageEmbed } = require('discord.js');

/**
 * Function to create Embed easier.
 *
 * @param {string} color The color of the embed
 * @param {string} title The title of the embed
 * @param {string} footer The fotter of the embed
 * @param {boolean} timestamp The fotter of the embed
 * @return {MessageEmbed} A Discord Embed
 */
function createEmbed(color, title, footer, timestamp) {
  const embed = new MessageEmbed();

  embed.setColor(color).setTitle(title);

  if (footer) {
    embed.setFooter(footer);
  }

  if (timestamp) {
    embed.setTimestamp();
  }

  return embed;
}

module.exports = createEmbed;
