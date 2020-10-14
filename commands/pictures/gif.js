const createEmbed = require('../../utils/disocrdUtils');
const giphy = require('giphy-api')();

async function run(client, message, args) {
  const userQuery = args[0] || 'parrot';
  var picture = '';

  giphy.search(
    {
      q: userQuery,
      limit: 2,
    },
    function (err, res) {
      picture = res.data[Math.floor(Math.random() * 2)].embed_url;
      console.log(picture);
    },
  );

  console.log(picture);

  const waitingMessage = await message.channel.send(
    createEmbed(
      '#ff9900',
      `📷 ${message.author.username} asked for a ${userQuery}'s gif !`,
      `Asked by ${message.author.username}`,
    ).setImage(picture),
  );
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
