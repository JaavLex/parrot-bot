const {
  createUserEmbed,
  replaceDiscordTag,
} = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence =
    replaceDiscordTag(args.join(' '), message.guild) || 'Sweet dreamy Miaou ';

  const embed = createUserEmbed(
    '#2c3e50',
    `🐈 ${message.author.username} invoked **Catinou**`,
    { author: message.author },
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
