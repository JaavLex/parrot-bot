const { Permissions } = require('../../utils/adminUtils');
const { createError } = require('../../utils/errorUtils');
const { createUserEmbed } = require('../../utils/discordUtils');

async function run(client, message, args) {
  const userMentioned = message.guild.member(message.mentions.users.first());
  const nicknameGiven = args.slice(1).join(' ') || userMentioned.username;

  if (userMentioned) {
    if (userMentioned.hasPermission("MANAGE_NICKNAMES")) {
      throw createError(
        'Can\'t nickname this user.',
        'This user has admin permissions. Please remove them before trying again.'
      );
    } else if (nicknameGiven.length <= 32) {
        userMentioned.setNickname(nicknameGiven)

        await message.channel.send(
          createUserEmbed('#8e44ad', "👋 User has been Nicknamed 👋", {
            author: message.author,
          })
            .setDescription(`User ${userMentioned.user.username} has been nicknamed : ${nicknameGiven}`),
        );
      } else {
        throw createError(
          'Nickname is too long !',
          'Nickname must be 32 characters or less !'
        );
      }
  } else {
    throw createError(
      'Can\'t nickname this user.',
      'No existing user has been mentionned in your ban command'
    );
  }
}

const nicknameCommand = {
  name: 'nickname',
  aliases: ['nicknameuser', 'nu', 'chnick', 'changenickname', 'chnickname'],
  category: 'admin',
  description: 'Nicknames a user from your server',
  autoMessageDeletion: false,
  permissions: [Permissions.MANAGE_NICKNAMES],
  run,
};

module.exports = nicknameCommand;
