const { MessageEmbed } = require('discord.js');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  console.log('say chiken start', args.join(' '));

  const sentence = args.join(' ') || 'I like you';

  const embed = new MessageEmbed()
    .setColor('#ff9900')
    .setTitle('🐓 Chiken say')
    .setTimestamp();

  embed.setDescription('```\n' + generateSayText(sentence) + '\n```');

  message.channel.send(embed);
}

const sayChikenCommand = {
  name: 'saychicken',
  category: 'say',
  description: 'Say bdd chicken',
  run,
};

module.exports = sayChikenCommand;
