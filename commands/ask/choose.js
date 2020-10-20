const { createUserEmbed } = require('../../utils/discordUtils');

async function run(client, message, args) {
  const userQuestion = args.join(' ') || 'Who loves parrot-bot ?';
  const serverMembersList = message.guild.members.cache;

  var serverUsersList = [];

  serverMembersList.forEach(GuildMember => {
    if (!GuildMember.user.bot) {
      serverUsersList.push(`${GuildMember.user.id}`);
    }
  });

  await message.channel.send(
    createUserEmbed('#ff9900', `🤔 Here's your answer... 🤔`, {
      command: chooseCommand.name,
      author: message.author,
    }).addField(
      `> ${userQuestion}`,
      '<@' +
        serverUsersList[Math.floor(Math.random() * serverUsersList.length)] +
        '>',
    ),
  );
}

const chooseCommand = {
  name: 'choose',
  aliases: ['chse'],
  category: 'ask',
  description: 'Chooses someone based on the question asked !',
  usage: '[question]',
  autoMessageDeletion: false,
  run,
};

module.exports = chooseCommand;
