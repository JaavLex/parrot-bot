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
function createEmbed(color, title, footer, timestamp = true) {
  const embed = new MessageEmbed().setColor(color);

  title && embed.setTitle(title);
  footer && embed.setFooter(footer);
  timestamp && embed.setTimestamp();

  return embed;
}

module.exports = createEmbed;
