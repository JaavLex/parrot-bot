const { createUserEmbed } = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'NOOT NOOT';

  const embed = createUserEmbed(
    '#ff9900',
    `🐧 ${message.author.username} invoked **Pingu**`,
    {
      command: penguinsayCommand.name,
      author: message.author,
    },
  );

  const penguin = `
 \\ 
  \\   __
   -=(o '.
     '.-.\\
     /|  \\\\
     '|  ||
      _\\_):,_
`;

  embed.setDescription(
    createMdBlock(generateSayText(sentence, penguin.length) + penguin),
  );

  await message.channel.send(embed);
}

const penguinsayCommand = {
  name: 'penguinsay',
  category: 'say',
  aliases: ['pingusay'],
  description: 'You invoke a penguin to make it say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = penguinsayCommand;
