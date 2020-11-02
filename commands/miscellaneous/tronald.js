const fetch = require('node-fetch');
const { createUserEmbed } = require('../../utils/discordUtils');

async function run(client, message, args) {
  fetch('https://www.tronalddump.io/random/quote')
    .then(res => res.json())
    .then(async json => {
      await message.channel.send(
        createUserEmbed('#8e44ad', "👱 Here's your Donald Trump quote 👱", {
          author: message.author,
          command: tronaldCommand.command,
        }).setDescription(json.value),
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
