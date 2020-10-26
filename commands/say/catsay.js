const { createUserEmbed } = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'Sweet dreamy Miaou ';

  const embed = createUserEmbed(
    '#2c3e50',
    `🐈 ${message.author.username} invoked **Catinou**`,
    {
      command: catsayCommand.name,
      author: message.author,
    },
  );

  const cat = `
  \\   ,_     _
   \\  |\\\\_,-~/
    \\ / _  _ |    ,--.
     (  @  @ )   / ,-'
      \\  _T_/-._( (
      /         \`. \\
     |         _  \\ |
      \\ \\ ,  /      |
       || |-_\\__   /
      ((_/\`(____,-'
`;

  embed.setDescription(
    createMdBlock(generateSayText(sentence, cat.length) + cat),
  );

  await message.channel.send(embed);
}

const catsayCommand = {
  name: 'catsay',
  category: 'say',
  aliases: ['casay'],
  description: 'You invoke a cat to say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = catsayCommand;
