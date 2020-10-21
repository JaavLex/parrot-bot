const { createUserEmbed } = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/functions');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'Run my duck 😜';

  const embed = createUserEmbed(
    '#e74c3c',
    `👶 ${message.author.username} invoked **a beauty baby**`,
    {
      command: babysayCommand.name,
      author: message.author,
    },
  );

  const cannibal = `
  ,=""=,   |
  c , _,{ /
  /\\  @ )                __
 /  ^~~^\\          <=.,__/ '}=
(_/ ,, ,,)          \\_ _>_/~
 ~\\_(/-\\)'-,_,_,_,-'(_)-(_)
       `;

  embed.setDescription(
    createMdBlock(generateSayText(sentence, cannibal.length) + cannibal),
  );

  await message.channel.send(embed);
}

const babysayCommand = {
  name: 'babysay',
  aliases: ['basay', 'bysay'],
  category: 'say',
  description: 'You invoke a baby to say what you want !',
  autoMessageDeletion: true,
  run,
};

module.exports = babysayCommand;
