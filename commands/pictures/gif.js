const { createUserEmbed } = require('../../utils/discordUtils');
const getGifApi = require('../../utils/services/gifServices');

async function run(client, message, args) {
  const userQuery = args.join(' ') || 'parrot';
  const imageURL = await getGifApi(userQuery);

  await message.channel.send(
    createUserEmbed('#ff9900', `📷 Your gif of : "${userQuery}"! 📷`, {
      command: gifCommand.name,
      author: message.author,
    }).setImage(imageURL),
  );
}

const gifCommand = {
  name: 'gif',
  aliases: ['g'],
  category: 'pictures',
  description:
    'Posts random gifs (of parrots by default). Add a keyword to search a gif of something!',
  usage: '[keyword]',
  autoMessageDeletion: false,
  run,
};

module.exports = gifCommand;
