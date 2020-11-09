const { Permissions } = require('../../utils/adminUtils');

async function run(client, message, args) {
  await message.channel.send('salut');
}

const testAdmin = {
  name: 'test-admin',
  aliases: ['ta'],
  category: 'admin',
  description: 'Test admin',
  autoMessageDeletion: false,
  permissions: [Permissions.MANAGE_CHANNELS, Permissions.KICK_MEMBERS],
  run,
};

module.exports = testAdmin;
