const { MessageEmbed } = require('discord.js');
const { createUserEmbed } = require('../../utils/discordUtils');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'Eat human miam miam';

  const embed = createUserEmbed(
    '#e74c3c',
    `🍖 ${message.author.username} invoked **THE CANNIBAL**`,
    {
      command: saycatCommand.name,
      author: message.author,
    },
  );

  const cannibal = `
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
    '```\n' + generateSayText(sentence, cannibal.length) + cannibal + '\n```',
  );

  await message.channel.send(embed);
}

const saycatCommand = {
  name: 'cannibalsay',
  aliases: ['cannisay'],
  category: 'say',
  description: 'You invoke a cannibal to say what you want !',
  autoMessageDeletion: true,
  run,
};

module.exports = saycatCommand;
