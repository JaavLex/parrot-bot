const { createUserEmbed } = require('../../utils/discordUtils');
const { createMdBlock } = require('../../utils/utils');
const generateSayText = require('../../utils/services/sayServices');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'oooooooo oooo OO OO';

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
  description: 'You invoke a otter to say what you want!',
  autoMessageDeletion: true,
  run,
};

module.exports = ottersayCommand;
