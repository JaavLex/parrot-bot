const { createUserEmbed } = require('../../utils/discordUtils');
const { createError } = require('../../utils/errorUtils');
const giphy = require('giphy-api')();

async function run(client, message, args) {
  const userQuery = args[0] || 'parrot';

  let gifQuery = await giphy.search(userQuery).then(function (res) {
    const result = res.data[Math.floor(Math.random() * 26)];
    if (!result) {
      throw createError(
        'No results to your query were found !',
        'Your query could not be found by the giphy API.',
        'Try to specify your query in a short specific keyword',
        true,
      );
    }
    return result.images.original.url;
  });

  const gifMessage = await message.channel.send(
    createUserEmbed('#ff9900', `📷 Here's your ${userQuery}'s gif !`, {
      command: gifCommand.name,
      author: message.author,
    }).setImage(gifQuery),
  );
}

const gifCommand = {
  name: 'gif',
  aliases: ['g'],
  category: 'pictures',
  description:
    'Posts random gifs (of parrots by default). Add a keyword to search a gif of something !',
  usage: '[keyword]',
  autoMessageDeletion: false,
  run,
};

module.exports = gifCommand;
