const giphy = require('giphy-api')();
const { createUserEmbed } = require('../../utils/discordUtils');
const { createError } = require('../../utils/errorUtils');
const { randomNumber } = require('../../utils/utils.js');

async function run(client, message, args) {
  const userQuery = args.join(' ') || 'parrot';

  const imageUrl = await giphy.search(userQuery).then(response => {
    if (!response || !response.data) {
      throw createError(
        'An error was encountered.',
        '',
        'Retry command !',
        true,
      );
    }

    const imageData = response.data[randomNumber(0, 25)];
    if (!imageData) {
      throw createError(
        'No results to your query were found!',
        'Your query could not be found by the giphy API.',
        'Try to specify your query in a short specific keyword',
        true,
      );
    }
    return imageData.images.original.url;
  });

  await message.channel.send(
    createUserEmbed('#ff9900', `📷 Your gif of : "${userQuery}"! 📷`, {
      command: gifCommand.name,
      author: message.author,
    }).setImage(imageUrl),
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
