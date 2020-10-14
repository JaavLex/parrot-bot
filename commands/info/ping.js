const { createEmbed } = require('../../utils/disocrdUtils');

async function run(client, message, args) {
  const waitingMessage = await message.channel.send(
    createEmbed('#ff9900', '🌐 Latency 🌐').addField(
      '✍️ Pinging ...',
      'Results will be delivered shortly !',
    ),
  );

  const pingMessage = createEmbed('#ff9900', '🌐 Latency 🌐')
    .addField(
      '🤖 Bot Latency :',
      `**${Math.floor(waitingMessage.createdAt - message.createdAt)}** ms`,
    )
    .addField('📄 API Latency :', `**${Math.round(client.ws.ping)}** ms`)
    .setTimestamp();

  waitingMessage.edit(pingMessage);
}

const pingCommand = {
  name: 'ping',
  category: 'info',
  description: "Returns bot's latency and API' latency",
  autoMessageDeletion: false,
  run,
};

module.exports = pingCommand;
