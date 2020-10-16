const { MessageEmbed } = require('discord.js');
const { createUserEmbed, createEmbed } = require('../../utils/discordUtils');
const { randomNumber } = require('../../utils/functions');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'Puk puk Pukaaakka';

  const dickSize = randomNumber(10, 25);

  let newMessage = '8==========';

  const embed = createUserEmbed('#9b59b6', "You're dick size !", {
    author: message.author,
    command: sayChikenCommand.name,
  });

  embed.setDescription(newMessage);

  const sendingMessage = await message.channel.send(embed);

  timeBuncle(sendingMessage, newMessage, embed, dickSize);
}

async function timeBuncle(sendingMessage, previousMessage, embed, dickSize) {
  console.log(
    'message length :',
    previousMessage.length,
    'dicksize :',
    dickSize,
  );

  const dif = dickSize - previousMessage.length;

  if (dif > 3) {
    const newMessage = previousMessage + '===';
    embed.setDescription(newMessage);
    sendingMessage.edit(embed);
    setTimeout(
      () => timeBuncle(sendingMessage, newMessage, embed, dickSize),
      50,
    );
  } else if (dif === 3) {
    const newMessage = previousMessage + '==D (' + dickSize + 'cm)';
    embed.setDescription(newMessage);
    sendingMessage.edit(embed);
  } else if (dif === 2) {
    const newMessage = previousMessage + '=D (' + dickSize + 'cm)';
    embed.setDescription(newMessage);
    sendingMessage.edit(embed);
  } else {
    const newMessage = previousMessage + 'D (' + dickSize + 'cm)';
    embed.setDescription(newMessage);
    sendingMessage.edit(embed);
  }
}

const sayChikenCommand = {
  name: 'dicksize',
  category: 'funny',
  aliases: ['dz'],
  description: 'You invoke a chicken to say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = sayChikenCommand;
