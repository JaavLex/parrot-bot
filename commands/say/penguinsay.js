const {
  createUserEmbed,
  replaceDiscordTag,
} = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence =
    replaceDiscordTag(args.join(' '), message.guild) || 'NOOT NOOT';

  const embed = createUserEmbed(
    '#ff9900',
    `🐧 ${message.author.username} invoked **Pingu**`,
    { author: message.author },
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
  description: 'Invokes a penguin to make it say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = penguinsayCommand;
