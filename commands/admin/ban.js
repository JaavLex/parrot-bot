const { Permissions } = require('../../utils/adminUtils');
const { createError } = require('../../utils/errorUtils');
const { createUserEmbed } = require('../../utils/discordUtils');

async function run(client, message, args) {
  const userMentioned = message.guild.member(message.mentions.users.first());
  const banReason = args.slice(1).join(' ') || 'You have been banned from this server.';

  if (userMentioned) {
    if (userMentioned.hasPermission("BAN_MEMBERS")) {
      throw createError(
        'Can\'t ban this user.',
        'This user has admin permissions. Please remove them before trying again.'
      );
    } else {
      userMentioned.ban({reason: banReason})

      await message.channel.send(
        createUserEmbed('#8e44ad', "👋 User has been banned 👋", {
          author: message.author,
        })
          .setDescription(`User ${userMentioned.username} has been banned for reason : ${banReason}`),
      );
    }
  } else {
    throw createError(
      'Can\'t ban this user.',
      'No existing user has been mentionned in your ban command'
    );
  }
}

const banCommand = {
  name: 'ban',
  aliases: ['banuser'],
  category: 'admin',
  description: 'Bans a user from your server',
  autoMessageDeletion: false,
  permissions: [Permissions.BAN_MEMBERS],
  run,
};

module.exports = banCommand;
