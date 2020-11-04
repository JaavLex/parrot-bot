const giphy = require('giphy-api')();
const fetch = require('node-fetch');
const { createUserEmbed } = require('../../utils/discordUtils');
const { createError } = require('../../utils/errorUtils');
const { randomNumber, createMdBlock } = require('../../utils/utils');

async function run(client, message, args) {
  const imageUrl = await giphy.search('Donald Trump').then(response => {
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

  fetch('https://www.tronalddump.io/random/quote')
    .then(res => res.json())
    .then(async json => {
      await message.channel.send(
        createUserEmbed('#8e44ad', "👱 Here's your Donald Trump quote 👱", {
          author: message.author,
          command: tronaldCommand.command,
        })
          .setDescription(`> ${json.value}`)
          .setImage(imageUrl),
      );
    });
}

const tronaldCommand = {
  name: 'tronald',
  category: 'miscellaneous',
  aliases: ['tr', 'donald', 'trump'],
  description: 'Random donald trump quote',
  autoMessageDeletion: false,
  run,
};

module.exports = tronaldCommand;
