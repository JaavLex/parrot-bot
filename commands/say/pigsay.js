const { createUserEmbed } = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/functions');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'oink oink oink';

  const embed = createUserEmbed(
    '#ff9900',
    `🐷 ${message.author.username} invoked **Plopper the Pig**`,
    {
      command: sayPigCommand.name,
      author: message.author,
    },
  );

  const pig = `
   \\      _____  
    \\ ^..^     \\9
      (oo)_____/ 
         WW  WW`;

  embed.setDescription(
    createMdBlock(generateSayText(sentence, pig.length) + pig),
  );

  message.channel.send(embed);
}

const sayPigCommand = {
  name: 'pigsay',
  category: 'say',
  description: 'You invoke a pig to make it say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = sayPigCommand;
