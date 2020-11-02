const { createUserEmbed } = require('../../utils/discordUtils');
const { randomNumber, jaugeBar } = require('../../utils/utils.js');

async function run(client, message, args) {
  const userMentioned = message.mentions.users.first() || client.user;

  await message.channel.send(
    createUserEmbed('#ff9900', `👫 Cuckness rate is evaluated 👫`, {
      command: cuckrateCommand.name,
      author: message.author,
    }).setDescription(
      `**${userMentioned}'s rate of cuckness :**\n ${jaugeBar(
        randomNumber(0, 100),
        20,
      )}`,
    ),
  );
}

const cuckrateCommand = {
  name: 'cuck',
  aliases: ['cuckrate', 'crate', 'cr'],
  category: 'ask',
  description: "Evalutates someone's cuckness !",
  usage: '[target user]',
  autoMessageDeletion: true,
  run,
};

module.exports = cuckrateCommand;
