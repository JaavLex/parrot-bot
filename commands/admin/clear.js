const { Permissions } = require('../../utils/adminUtils');

async function run(client, message, args) {
  await message.channel.bulkDelete(11).then(() => {
    message.channel.send('Deleted 10 messages.');
  });
}

const clearCommand = {
  name: 'clear',
  aliases: ['purge'],
  category: 'admin',
  description: 'Deletes the last 10 messages',
  autoMessageDeletion: false,
  permissions: [Permissions.MANAGE_CHANNELS],
  run,
};

module.exports = clearCommand;
