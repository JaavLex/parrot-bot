const { MessageEmbed } = require('discord.js');
const createEmbed = require('../../utils/disocrdUtils');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'Puk puk Pukaaakka';

  const embed = createEmbed('#ff9900', '🐓 Chicken say');

  const chicken = `
   \\   __//
    \\ / . .\\
      \\  V /
   '__/    \\
   \\-      )
    \\_____/
  _____|_|____
       " "
  `;

  embed.setDescription('```\n' + generateSayText(sentence) + chicken + '\n```');

  message.channel.send(embed);
}

const sayChikenCommand = {
  name: 'chickensay',
  category: 'say',
  description: 'Say bdd chicken',
  run,
};

module.exports = sayChikenCommand;
