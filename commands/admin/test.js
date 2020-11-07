const { Permissions } = require('../../utils/adminUtils');

async function run(client, message, args) {
  await message.channel.send('salut');
}

const chooseCommand = {
  name: 'test-admin',
  aliases: ['ta'],
  category: 'ask',
  description: 'Chooses someone based on the question asked !',
  usage: '[question]',
  autoMessageDeletion: false,
  permissions: [Permissions.MANAGE_CHANNELS, Permissions.KICK_MEMBERS],
  run,
};

module.exports = chooseCommand;
