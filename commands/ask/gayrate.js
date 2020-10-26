const { createUserEmbed } = require('../../utils/discordUtils');
const { randomNumber, jaugeBar } = require('../../utils/utils.js');

async function run(client, message, args) {
  const userMentioned = message.mentions.users.first() || client.user;

  await message.channel.send(
    createUserEmbed('#ff9900', `🏳️‍🌈 Gayness rate is evaluated 🏳️‍🌈`, {
      command: gayrateCommand.name,
      author: message.author,
    }).setDescription(
      `**${userMentioned}'s rate of gayness :**\n ${jaugeBar(
        randomNumber(0, 100),
        20,
        { filler: '🏳️‍🌈', unfiller: '  ' },
      )}`,
    ),
  );
}

const gayrateCommand = {
  name: 'gayrate',
  aliases: ['grate'],
  category: 'ask',
  description: "Evalutates someone's gayness !",
  usage: '[target user]',
  autoMessageDeletion: true,
  run,
};

module.exports = gayrateCommand;
