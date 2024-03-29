const {
  createUserEmbed,
  replaceDiscordTag,
} = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence =
    replaceDiscordTag(args.join(' '), message.guild) || 'oooooooo oooo OO OO';

  const embed = createUserEmbed(
    '#2980b9',
    `🦦  ${message.author.username} invoked **Baby Otter**`,
    { author: message.author },
  );

  const otter = `
       \\   .-"""-.
        \\ /      o\\
         |    o   0).-.
         |       .-;(_/     .-.
          \\     /  /)).---._|  \`\\   ,
           '.  '  /((       \`'-./ _/|
             \\  .'  )        .-.;\`  /
              '.             |  \`\\-'
                 '._        -'    /
                   \`\`""--\`------'    `;

  embed.setDescription(
    createMdBlock(generateSayText(sentence, otter.length) + otter),
  );

  await message.channel.send(embed);
}

const ottersayCommand = {
  name: 'ottersay',
  aliases: ['otsay'],
  category: 'say',
  description: 'Invokes a otter to make it say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = ottersayCommand;
