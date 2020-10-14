const { MessageEmbed } = require('discord.js');
const createEmbed = require('../../utils/disocrdUtils');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'oooooooo oooo OO OO';

  const embed = createEmbed(
    '#ff9900',
    `🦦 ${message.author.username} invoked **Baby Otter**`,
    `Asked by ${message.author.username}`,
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
                   \`\`""--\`------\'    `;

  embed.setDescription('```\n' + generateSayText(sentence) + otter + '\n```');

  message.channel.send(embed);
}

const sayotterCommand = {
  name: 'ottersay',
  category: 'say',
  description: 'You invoke a otter to say what you want !',
  autoMessageDeletion: true,
  run,
};

module.exports = sayotterCommand;
