const fetch = require('node-fetch');
const { createUserEmbed } = require('../../utils/discordUtils');
const randomGif = require('../../utils/services/gifServices');

async function run(client, message, args) {
  const image = await randomGif('Donald Trump');

  fetch('https://www.tronalddump.io/random/quote')
    .then(res => res.json())
    .then(async json => {
      await message.channel.send(
        createUserEmbed('#8e44ad', "👱 Here's your Donald Trump quote 👱", {
          author: message.author
        })
          .setDescription(`> ${json.value}`)
          .setImage(image),
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
