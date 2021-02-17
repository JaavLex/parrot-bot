const {
  createUserEmbed,
  replaceDiscordTag,
} = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence =
    replaceDiscordTag(args.join(' '), message.guild) || 'Puk puk Pukaaakka';

  const embed = createUserEmbed(
    '#ff9900',
    `🐓 ${message.author.username} invoked **El Pollo**`,
    { author: message.author },
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
  description: 'Invokes a chicken to say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = chickensayCommand;
