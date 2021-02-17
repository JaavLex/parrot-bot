const {
  createUserEmbed,
  replaceDiscordTag,
} = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence =
    replaceDiscordTag(args.join(' '), message.guild) || 'Eat human miam miam';

  const embed = createUserEmbed(
    '#e74c3c',
    `🍖 ${message.author.username} invoked **THE CANNIBAL**`,
    { author: message.author },
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

const cannibalsayCommand = {
  name: 'cannibalsay',
  aliases: ['saycanni', 'cannisay'],
  category: 'say',
  description: 'Invokes a cannibal to say what you want !',
  autoMessageDeletion: true,
  run,
};

module.exports = cannibalsayCommand;
