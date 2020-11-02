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
    data: { author: message.author },
  });
}

async function onCollect(emoji, msg, users, data) {
  if (msg.embeds[0].description.toLowerCase().includes('😨')) {
    const newMsg = await msg.channel.send(createEmbedRoulette(data.author));
    newMsg.react('🔁');

    createCollectorMessage(newMsg, onCollect, {
      time: 30000,
      filter: (reaction, user) =>
        user.id === data.author.id && reaction.emoji.name === '🔁',
      data,
    });
  } else {
    await msg.channel.send(
      createUserEmbed('#ff9900', `🔫 Russian Roulette 🔫`, {
        command: russianrouletteCommand.name,
        author: data.author,
      }).setDescription(`__**💀 CANNOT REPLAY SINCE YOU'RE DEAD 💀**__`),
    );
  }
}

function createEmbedRoulette(author) {
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
  category: 'games',
  aliases: ['rr', 'rroulette', 'russian'],
  description: '1 out of 6 chance to shoot yourself be careful !',
  autoMessageDeletion: true,
  run,
};

module.exports = russianrouletteCommand;
