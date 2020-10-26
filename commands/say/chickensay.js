const { createUserEmbed } = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'Puk puk Pukaaakka';

  const embed = createUserEmbed(
    '#ff9900',
    `🐓 ${message.author.username} invoked **El Pollo**`,
    {
      command: chickensayCommand.name,
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
    createMdBlock(generateSayText(sentence, chicken.length) + chicken),
  );

  await message.channel.send(embed);
}

const chickensayCommand = {
  name: 'chickensay',
  category: 'say',
  aliases: ['chicsay'],
  description: 'You invoke a chicken to say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = chickensayCommand;
