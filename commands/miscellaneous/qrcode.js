const { createUserEmbed } = require('../../utils/discordUtils');

async function run(client, message, args) {
  const link = args.join(' ') || 'https://yoyo.ch';

  await message.channel.send(
    createUserEmbed('#8e44ad', '👌 Your qrcode here 💪', {
      author: message.author,
    })
      .setDescription('The qrcode may take time to load.')
      .setImage(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${link}`,
      ),
  );
}

const qrcodeCommand = {
  name: 'qrcode',
  category: 'miscellaneous',
  aliases: ['qr', 'qcode', 'rcode'],
  description: 'Generate a qrcode !',
  usage: '<qr code link>',
  autoMessageDeletion: false,
  run,
};

module.exports = qrcodeCommand;
