const { createUserEmbed } = require('../../utils/discordUtils');
const { randomNumber } = require('../../utils/utils.js');

async function run(client, message, args) {
  const userQuestion = args.join(' ') || 'Who loves parrot-bot ?';
  const serverMembersList = message.channel.members;

  const serverUsersList = serverMembersList
    .filter(m => !m.user.bot)
    .map(m => m.user.id);

  await message.channel.send(
    createUserEmbed('#ff9900', `🤔 Here's your answer... 🤔`, {
      author: message.author,
    }).addField(
      `> ${userQuestion}`,
      `<@${serverUsersList[randomNumber(0, serverUsersList.length)]}>`,
    ),
  );
}

const chooseCommand = {
  name: 'choose',
  aliases: ['chse'],
  category: 'ask',
  description: 'Chooses someone based on the question asked !',
  usage: '[question]',
  autoMessageDeletion: true,
  run,
};

module.exports = chooseCommand;
