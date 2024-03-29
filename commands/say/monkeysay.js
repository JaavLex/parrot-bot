const {
  createUserEmbed,
  replaceDiscordTag,
} = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence =
    replaceDiscordTag(args.join(' '), message.guild) || 'hoo hoo hoo hoo';

  const embed = createUserEmbed(
    '#ff9900',
    `🐵 ${message.author.username} invoked **Jack the Monkey**`,
    { author: message.author },
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

  await message.channel.send(embed);
}

const monkeysayCommand = {
  name: 'monkeysay',
  category: 'say',
  aliases: ['monkysay', 'monksay'],
  description: 'Invokes a monkey to make it say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = monkeysayCommand;
