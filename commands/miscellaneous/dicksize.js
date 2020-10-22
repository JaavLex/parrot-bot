const { createUserEmbed } = require('../../utils/discordUtils');
const { randomNumber } = require('../../utils/functions');

async function run(client, message) {
  const userMentioned = message.mentions.users.first() || message.author;

  const randomSize = randomNumber(5, 25);

  const embed = createUserEmbed(
    '#8e44ad',
    '🍆 Dick Size has been evaluated! 🍌',
    {
      author: message.author,
      command: dicksizeCommand.command,
    },
  ).setDescription(
    `😋 ${userMentioned}'s dick size
    ${generateDick(randomSize)}`,
  );

  const sendingMessage = await message.channel.send(embed);

  setTimeout(async () => {
    if (randomNumber(0, 1)) {
      embed.setDescription(
        `**🤡 Sike!**, __THIS__ is ${userMentioned}'s correct dick size !
        ${generateDick(randomNumber(2, randomSize))}`,
      );

      sendingMessage.edit(embed);
    }
  }, 3000);
}

function generateDick(size) {
  let message = '8';

  for (let i = 0; i <= size; i++) {
    message += '=';
  }

  message += `> (${size}cm)`;
  return message;
}

const dicksizeCommand = {
  name: 'dicksize',
  category: 'miscellaneous',
  aliases: ['ds', 'dicks', 'dsize'],
  description: "The bot will evaluate someone's dick size !",
  usage: '[target user]',
  autoMessageDeletion: true,
  run,
};

module.exports = dicksizeCommand;
