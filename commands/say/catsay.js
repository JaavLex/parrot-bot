const { MessageEmbed } = require('discord.js');
const { createUserEmbed } = require('../../utils/disocrdUtils');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'Eat human miam miam';

  const embed = createUserEmbed(
    '#e74c3c',
    `🍖 ${message.author.username} invoked **THE CANIBAL**`,
    {
      command: saycatCommand.name,
      author: message.author,
    },
  );

  const canibal = `
      \\             .-.
       \\   \\\\\\V/// (o.o)
        \\  #######  |=|
         \\//6 , 6\\\\  Y
           \\  =  /   |
          .-:---:---'B
         /   \`@\` ,--'|
        ( <|'   '|   |
         \\ \\__.__/   |
          \`/<<<<<\\   |
          (>>>>>>>)  |
          \`"|"|"|"\`  |
            |_| |    |
           _(_| |_   |
          (___|___)  |
       `;

  embed.setDescription(
    '```\n' + generateSayText(sentence, canibal.length) + canibal + '\n```',
  );

  await message.channel.send(embed);
}

const saycatCommand = {
  name: 'canibalsay',
  aliases: ['canisay'],
  category: 'say',
  description: 'You invoke a cat to say what you want !',
  autoMessageDeletion: true,
  run,
};

module.exports = saycatCommand;
