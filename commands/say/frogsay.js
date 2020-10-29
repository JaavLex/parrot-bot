const { createUserEmbed } = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'Guaaaaaark';

  const embed = createUserEmbed(
    '#16a085',
    `🐸 ${message.author.username} invoked **Greegrree**`,
    {
      command: frogsayCommand.name,
      author: message.author,
    },
  );

  const frog = `
      \\  (.)(.)
     ,-.(.____.),-.  
    ( \\ \\ '--' / / )
     \\ \\ / ,. \\ / /
      ) '| || |' ( 
  OoO'- OoO''OoO -'OoO
        `;

  embed.setDescription(
    createMdBlock(generateSayText(sentence, frog.length) + frog),
  );

  message.channel.send(embed);
}

const frogsayCommand = {
  name: 'frogsay',
  category: 'say',
  aliases: ['fosay', 'fgsay'],
  description: 'You invoke a frog to make it say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = frogsayCommand;
