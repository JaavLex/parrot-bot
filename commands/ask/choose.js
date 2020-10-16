const { createEmbed } = require('../../utils/discordUtils');

async function run(client, message, args) {
  const userQuestion = args.join(' ') || 'parrot';

  console.log(message.guild.members);

  await message.channel.send(
    createEmbed('#ff9900', '🌐 Latency 🌐').addField(
      'test ',
      message.guild.members,
    ),
  );
}

const pingCommand = {
  name: 'choose',
  aliases: ['chse'],
  category: 'ask',
  description: 'Chooses someone based on the question asked !',
  usage: '[question]',
  autoMessageDeletion: false,
  run,
};

module.exports = pingCommand;
