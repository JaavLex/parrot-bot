const { createUserEmbed } = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/functions');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'Eat human miam miam';

  const embed = createUserEmbed(
    '#e74c3c',
    `🍖 ${message.author.username} invoked **THE CANNIBAL**`,
    {
      command: saycannibalCommand.name,

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
    createMdBlock(generateSayText(sentence, cannibal.length) + cannibal),
  );

  await message.channel.send(embed);
}

const saycannibalCommand = {
  name: 'saycannibal',
  aliases: ['cannisay', 'saycanni'],
  category: 'say',
  description: 'You invoke a cannibal to say what you want !',
  autoMessageDeletion: true,
  run,
};

module.exports = saycannibalCommand;
