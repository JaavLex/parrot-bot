const { createUserEmbed } = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'oink oink oink';

  const embed = createUserEmbed(
    '#f368e0',
    `🐷 ${message.author.username} invoked **Plopper the Pig**`,
    { author: message.author },
  );

  const pig = `
   \\      _____  
    \\ ^..^     \\9
      (oo)_____/ 
         WW  WW`;

  embed.setDescription(
    createMdBlock(generateSayText(sentence, pig.length) + pig),
  );

  await message.channel.send(embed);
}

const pigsayCommand = {
  name: 'pigsay',
  category: 'say',
  description: 'You invoke a pig to make it say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = pigsayCommand;
