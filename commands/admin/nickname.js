const { Permissions } = require('../../utils/adminUtils');
const { createError } = require('../../utils/errorUtils');
const { createUserEmbed } = require('../../utils/discordUtils');

async function run(client, message, args) {
  const userMentioned = message.guild.member(message.mentions.users.first());
  const nicknameGiven = args.slice(1).join(' ') || userMentioned.username;

  if (!userMentioned) {
    throw createError(
      "Can't nickname this user.",
      'No existing user has been mentionned in your ban command',
    );
  }

  if (userMentioned.hasPermission(Permissions.MANAGE_NICKNAMES.name)) {
    throw createError(
      "Can't nickname this user.",
      'This user has admin permissions. Please remove them before trying again.',
    );
  }

  if (nicknameGiven.length > 32) {
    throw createError(
      'Nickname is too long !',
      'Nickname must be 32 characters or less !',
    );
  }

  userMentioned.setNickname(nicknameGiven);
  await message.channel.send(
    createUserEmbed('#8e44ad', '👋 User has been Nicknamed 👋', {
      author: message.author,
    }).setDescription(
      `User ${userMentioned.user.username} has been nicknamed : ${nicknameGiven}`,
    ),
  );
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
