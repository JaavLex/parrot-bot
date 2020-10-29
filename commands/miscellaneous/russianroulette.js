const { createUserEmbed } = require('../../utils/discordUtils');
const { createError } = require('../../utils/errorUtils');
const { randomNumber } = require('../../utils/utils.js');
const { createCollectorMessage } = require('../../utils/reactionsUtils');

async function run(client, message) {
  let messageResult = '';

  async function launchRoulette() {
    const rouletteResult = randomNumber(1, 6);

    if (rouletteResult === 1) {
      messageResult = await message.channel.send(
        createUserEmbed('#ff9900', `🔫 Russian Roulette 🔫`, {
          command: russianrouletteCommand.name,
          author: message.author,
        }).setDescription(
          `**💀 You died 💀** : The bullet was in chamber n#${rouletteResult}`,
        ),
      );
    } else {
      messageResult = await message.channel.send(
        createUserEmbed('#ff9900', `🔫 Russian Roulette 🔫`, {
          command: russianrouletteCommand.name,
          author: message.author,
        }).setDescription(
          `**😨 You survived ! 😨** : The bullet was in chamber n#${rouletteResult}`,
        ),
      );
    }

    messageResult.react('🔁');

    redoOption(rouletteResult);
  }

  async function redoOption(result) {
    function onCollect() {
      if (result !== 1) {
        if (collected.first().emoji.name === '🔁') {
          launchRoulette();
        }
      } else {
        message.channel.send(
          createUserEmbed('#ff9900', `🔫 Russian Roulette 🔫`, {
            command: russianrouletteCommand.name,
            author: message.author,
          }).setDescription(
            `💀 You are dead, your are unable to replay the command 💀`,
          ),
        );
      }
    }

    createCollectorMessage(messageResult, onCollect, {
      time: 30000,
      filter: (reaction, user) =>
        user.id === message.author.id && reaction.emoji.name == '🔁',
    });

    /*     messageResult
      .awaitReactions(
        (reaction, user) =>
          user.id === message.author.id && reaction.emoji.name == '🔁',
        { max: 1, time: 30000 },
      )
      .then(collected => {})
      .catch(() => {
        throw createError(
          `No response after 30 seconds, operation cancelled`,
          `Waited for a reaction for too long.`,
          `Type !russianroulette again to retry`,
          true,
        );
      }); */
  }

  await launchRoulette();
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
