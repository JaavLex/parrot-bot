const { createUserEmbed } = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'WHAT DOES THE FOX SAYYY';

  const embed = createUserEmbed(
    '#f39c12',
    `🦊 ${message.author.username} invoked **Mr. Fox**`,
    {
      command: foxsayCommand.name,
      author: message.author,
    },
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

  message.channel.send(embed);
}

const foxsayCommand = {
  name: 'foxsay',
  category: 'say',
  description: 'You invoke a fox to make it say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = foxsayCommand;
