const { createUserEmbed } = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'I am Stuart.';

  const embed = createUserEmbed(
    '#ff9900',
    `🐭 ${message.author.username} invoked **Stuart Little**`,
    {
      command: mousesayCommand.name,
      author: message.author,
    },
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

  message.channel.send(embed);
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
