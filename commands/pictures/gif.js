const createEmbed = require('../../utils/disocrdUtils');
const giphy = require('giphy-api')();

async function run(client, message, args) {
  const userQuery = args[0] || 'parrot';

  let gifQuery = await giphy.search(userQuery).then(function (res) {
    return res.data[Math.floor(Math.random() * 26)].images.original.url;
  });

  try {
    const gifMessage = await message.channel.send(
      createEmbed(
        '#ff9900',
        `📷 ${message.author.username} asked for a ${userQuery}'s gif !`,
        `Asked by ${message.author.username}`,
      ).setImage(gifQuery),
    );
  } catch (e) {
    createError('No results were found !', e, 'Search smth else', true);
  }
}

const gifCommand = {
  name: 'gif',
  aliases: ['g'],
  category: 'pictures',
  description: 'Posts a random gif',
  autoMessageDeletion: false,
  run,
};

module.exports = gifCommand;
