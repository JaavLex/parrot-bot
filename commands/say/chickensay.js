const { MessageEmbed } = require('discord.js');
const { createUserEmbed } = require('../../utils/discordUtils');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'Puk puk Pukaaakka';

  const embed = createUserEmbed(
    '#ff9900',
    `🐓 ${message.author.username} invoked **El Pollo**`,
    {
      command: sayChikenCommand.name,
      author: message.author,
    },
  );

  const chicken = `
   \\   __//
    \\ / . .\\
      \\  V /
   '__/    \\
   \\-      )
    \\_____/
  _____|_|____
       " "`;

  embed.setDescription(
    '```\n' + generateSayText(sentence, chicken.length) + chicken + '\n```',
  );

  await message.channel.send(embed);
}

const sayChikenCommand = {
  name: 'chickensay',
  category: 'say',
  aliases: ['chicsay'],
  description: 'You invoke a chicken to say what you want !',
  autoMessageDeletion: true,
  run,
};

module.exports = sayChikenCommand;
