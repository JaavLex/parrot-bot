const { createUserEmbed } = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/functions');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'hoo hoo hoo hoo';

  const embed = createUserEmbed(
    '#ff9900',
    `🐵 ${message.author.username} invoked **Jack the Monkey**`,
    {
      command: monkeysayCommand.name,
      author: message.author,
    },
  );

  const monkey = `
   \\ 
    \\   __
   w  c(..)o   (
    \\__(-)    __)
        /\\   (
       /(_)___)
       w /|
        | \\
       m  m`;

  embed.setDescription(
    createMdBlock(generateSayText(sentence, monkey.length) + monkey),
  );

  message.channel.send(embed);
}

const monkeysayCommand = {
  name: 'monkeysay',
  category: 'say',
  aliases: ['monkysay', 'monksay'],
  description: 'You invoke a monkey to make it say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = monkeysayCommand;
