const { createEmbed, createUserEmbed } = require('../../utils/discordUtils');

async function run(client, message, args) {
  const userQuestion = args.join(' ') || 'Who loves parrot-bot ?';
  var membersList = [];

  message.guild.members.cache.forEach(GuildMember => {
    if (!GuildMember.user.bot) {
      membersList.push(`${GuildMember.user.id}`);
    }
  });

  await message.channel.send(
    createUserEmbed('#ff9900', `🤔 Here's your answer... 🤔`, {
      command: chooseCommand.name,
      author: message.author,
    })
      .addField('> ❔ Question', userQuestion)
      .addField(
        '> ❕ Answer',
        '<@' +
          membersList[Math.floor(Math.random() * membersList.length)] +
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
