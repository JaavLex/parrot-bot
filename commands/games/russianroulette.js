const { createUserEmbed } = require('../../utils/discordUtils');
const { randomNumber } = require('../../utils/utils.js');
const { reactionCollector } = require('../../utils/reactionsUtils');

async function run(client, message) {
  const msg = await message.channel.send(createEmbedRoulette(message.author));
  msg.react('🔁');

  reactionCollector(msg, onCollect, {
    time: 30000,
    filter: (reaction, user) => filter(reaction, user, message.author),
    data: { author: message.author },
  });
}

async function onCollect({ message, data }) {
  if (message.embeds[0].description.toLowerCase().includes('😨')) {
    const newMsg = await message.channel.send(createEmbedRoulette(data.author));
    newMsg.react('🔁');

    reactionCollector(newMsg, onCollect, {
      time: 30000,
      filter: (reaction, user) => filter(reaction, user, data.author),
      data,
    });
  } else {
    await message.channel.send(
      createUserEmbed('#ff9900', `🔫 Russian Roulette 🔫`, {
        author: data.author,
      }).setDescription(`__**💀 CANNOT REPLAY SINCE YOU'RE DEAD 💀**__`),
    );
  }
}

const filter = (reaction, user, author) => {
  console.log('bonsoir', user.id === author.id && reaction.emoji.name === '🔁');
  return user.id === author.id && reaction.emoji.name === '🔁';
};

function createEmbedRoulette(author) {
  const rouletteResult = randomNumber(1, 6);

  if (rouletteResult === 1) {
    return createUserEmbed('#ff9900', `🔫 Russian Roulette 🔫`, {
      author,
    }).setDescription(
      `**💀 You died 💀** : The bullet was in chamber n#${rouletteResult}`,
    );
  }

  return createUserEmbed('#ff9900', `🔫 Russian Roulette 🔫`, {
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
