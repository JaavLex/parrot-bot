const { createUserEmbed } = require('../../utils/discordUtils');
const { randomNumber } = require('../../utils/utils.js');
const { createCollectorMessage } = require('../../utils/reactionsUtils');

async function run(client, message) {
  const msg = await message.channel.send(createEmbedRoulette(message.author));
  msg.react('🔁');

  createCollectorMessage(msg, onCollect, {
    time: 30000,
    filter: (reaction, user) =>
      user.id === message.author.id && reaction.emoji.name === '🔁',
  });
}

function onCollect(emoji, msg, users) {
  const newMsg = msg.channel.send(createEmbedRoulette(msg.author));
  newMsg.react('🔁');

  createCollectorMessage(newMsg, onCollect, {
    time: 30000,
    filter: (reaction, user) =>
      user.id === msg.author.id && reaction.emoji.name === '🔁',
  });
}

async function createEmbedRoulette(author) {
  const rouletteResult = randomNumber(1, 6);

  if (rouletteResult === 1) {
    return createUserEmbed('#ff9900', `🔫 Russian Roulette 🔫`, {
      command: russianrouletteCommand.name,
      author,
    }).setDescription(
      `**💀 You died 💀** : The bullet was in chamber n#${rouletteResult}`,
    );
  }

  return createUserEmbed('#ff9900', `🔫 Russian Roulette 🔫`, {
    command: russianrouletteCommand.name,
    author,
  }).setDescription(
    `**😨 You survived ! 😨** : The bullet was in chamber n#${rouletteResult}`,
  );
}

const russianrouletteCommand = {
  name: 'russianroulette',
  category: 'miscellaneous',
  aliases: ['rr', 'rroulette', 'russian'],
  description: '1 out of 6 chance to shoot yourself be careful !',
  autoMessageDeletion: true,
  run,
};

module.exports = russianrouletteCommand;
