const {
  createUserEmbed,
  replaceDiscordTag,
} = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence =
    replaceDiscordTag(args.join(' '), message.guild) || 'Run my duck 😜';

  const embed = createUserEmbed(
    '#a5b1c2',
    `👶 ${message.author.username} invoked **a beauty baby**`,
    { author: message.author },
  );

  const baby = `
  ,=""=,   |
  c , _,{ /
  /\\  @ )                __
 /  ^~~^\\          <=.,__/ '}=
(_/ ,, ,,)          \\_ _>_/~
 ~\\_(/-\\)'-,_,_,_,-'(_)-(_)
       `;

  embed.setDescription(
    createMdBlock(generateSayText(sentence, baby.length) + baby),
  );

  await message.channel.send(embed);
}

const babysayCommand = {
  name: 'babysay',
  aliases: ['basay', 'bysay'],
  category: 'say',
  description: 'Invokes a baby to make it say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = babysayCommand;
