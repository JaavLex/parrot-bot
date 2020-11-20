const {
  createUserEmbed,
  replaceDiscordTag,
} = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence =
    replaceDiscordTag(args.join(' '), message.guild) || 'Pandemic';

  const embed = createUserEmbed(
    '#20bf6b',
    `🦠 ${message.author.username} invoked **Covid-19**`,
    { author: message.author },
  );

  const fox = `
   \\
    \\   q
    o .-o-. o 
  o-( o o o )-o
    o .-o-. o
        b
  `;

  embed.setDescription(
    createMdBlock(generateSayText(sentence, fox.length) + fox),
  );

  await message.channel.send(embed);
}

const covidSay = {
  name: 'covidsay',
  category: 'say',
  description: 'You invoke a covid to make it say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = covidSay;
