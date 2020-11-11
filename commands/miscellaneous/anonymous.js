const { createUserEmbed } = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');

async function run(client, message, args) {
  const sentence = args.join(' ') || "I'm an anonymous parrot!";

  await message.channel.send(
    createUserEmbed('#a5b1c2', `🕵 Anonymous Message 🕵`).setDescription(
      createMdBlock(sentence),
    ),
  );
}

const anonymCommand = {
  name: 'anonymous',
  category: 'miscellaneous',
  aliases: ['ano', 'anonym'],
  description: 'Resends your message while masking your identity',
  usage: '[Anonymous Text]',
  autoMessageDeletion: true,
  run,
};

module.exports = anonymCommand;
