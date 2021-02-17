const {
  createUserEmbed,
  replaceDiscordTag,
} = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence =
    replaceDiscordTag(args.join(' '), message.guild) ||
    'WHAT DOES THE FOX SAYYY';

  const embed = createUserEmbed(
    '#f39c12',
    `🦊 ${message.author.username} invoked **Mr. Fox**`,
    { author: message.author },
  );

  const fox = `
 \\ 
  \\  /\\   /\\
    //\\\\_//\\\\      ____
    \\_     _/     /   /
     / o o \\     /^^^]
      =\\o/=      [   ]
      /   \\_     [   /
      \\     \\_  /  /
       [  [ ( \\/ _/
      _[ _[ / / _/`;

  embed.setDescription(
    createMdBlock(generateSayText(sentence, fox.length) + fox),
  );

  await message.channel.send(embed);
}

const foxsayCommand = {
  name: 'foxsay',
  category: 'say',
  description: 'Invokes a fox to make it say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = foxsayCommand;
