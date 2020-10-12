const { MessageEmbed } = require('discord.js');
const createEmbed = require('../../utils/disocrdUtils');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'Puk puk Pukaaakka';

  const embed = createEmbed(
    '#ff9900',
    `🐓 ${message.author.username} invoke **El Pollo**`,
    `Asked by ${message.author.username}`,
  );

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
  description: 'You invoke a chicken to say what you want !',
  run,
};

module.exports = sayChikenCommand;
