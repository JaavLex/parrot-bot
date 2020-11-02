const {
  createUserEmbed,
  replaceDiscordTag,
} = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence =
    replaceDiscordTag(args.join(' '), message.guild) || 'I am Stuart.';

  const embed = createUserEmbed(
    '#ff9900',
    `🐭 ${message.author.username} invoked **Stuart Little**`,
    { author: message.author },
  );

  const mouse = `
 \\    _   _
  \\  (q\\_/p)
   \\  /. .\\
     =\\_t_/=   __
      /   \\   (
     ((   ))   )
     /\\) (/\\  /
     \\  Y  /-'
      nn^nn`;

  embed.setDescription(
    createMdBlock(generateSayText(sentence, mouse.length) + mouse),
  );

  await message.channel.send(embed);
}

const mousesayCommand = {
  name: 'mousesay',
  category: 'say',
  aliases: ['micesay', 'stuartsay'],
  description: 'You invoke a mouse to make it say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = mousesayCommand;
