const fetch = require('node-fetch');
const { createUserEmbed } = require('../../utils/discordUtils');
const getGifApi = require('../../utils/services/gifServices');

async function run(client, message, args) {
  const image = await getGifApi('cat');

  fetch('https://catfact.ninja/fact')
    .then(res => res.json())
    .then(async json => {
      await message.channel.send(
        createUserEmbed('#8e44ad', "🐱 Here's your cat fact 🐱", {
          author: message.author,
          command: catfactsCommand.command,
        })
          .setDescription(`> ${json.fact}`)
          .setImage(image),
      );
    });
}

const catfactsCommand = {
  name: 'catfacts',
  category: 'miscellaneous',
  aliases: ['cf', 'cfacts', 'catf'],
  description: 'Random cat facts',
  autoMessageDeletion: false,
  run,
};

module.exports = catfactsCommand;
