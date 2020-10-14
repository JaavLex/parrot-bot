const { MessageEmbed } = require('discord.js');
const { createUserEmbed } = require('../../utils/disocrdUtils');
const { createError } = require('../../utils/errorUtils');
const generateSayText = require('../../utils/sayUtils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'oooooooo oooo OO OO';

  const embed = createUserEmbed(
    '#2980b9',
    `🦦  ${message.author.username} invoked **Baby Otter**`,
    {
      command: sayotterCommand.name,
      author: message.author,
    },
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
