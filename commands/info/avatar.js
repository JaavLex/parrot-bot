const {
  createUserEmbed,
} = require('../../utils/discordUtils');

async function run(client, message, args) {
  const userMentioned = message.mentions.users.first() || message.author;

  const embed = createUserEmbed('#f39c12', '', {
    author: message.author,
  })
    .setImage(
      userMentioned.displayAvatarURL({
        dynamic: true,
        format: 'png',
        size: 512,
      }),
    )
    .setAuthor(userMentioned.username);

  await message.channel.send(embed);
}

const avatarCommand = {
  name: 'avatar',
  category: 'info',
  aliases: ['pic', 'pp'],
  description: 'Display the avatar of mentioned user',
  autoMessageDeletion: false,
  run,
};

module.exports = avatarCommand;
