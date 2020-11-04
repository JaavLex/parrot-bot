const { Permissions } = require('../../utils/adminUtils');

async function run(client, message, args) {
  await message.channel.send('YOU CAN DO THIS');
}

const chooseCommand = {
  name: 'testa',
  aliases: ['ta'],
  category: 'ask',
  description: 'Chooses someone based on the question asked !',
  usage: '[question]',
  autoMessageDeletion: false,
  permissions: [Permissions.MANAGE_CHANNELS, Permissions.KICK_MEMBERS],
  run,
};

module.exports = chooseCommand;
