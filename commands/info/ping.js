const { MessageEmbed } = require('discord.js');

async function run(client, message, args) {
  const waitingMessage = await message.channel.send(
    new MessageEmbed()
      .setColor('#ff9900')
      .setTitle('🌐 Latency 🌐')
      .addField('✍️ Pinging ...', 'Results will be delivered shortly !'),
  );

  const pingMessage = new MessageEmbed()
    .setColor('#ff9900')
    .setTitle('🌐 Latency 🌐')
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
  run,
};

module.exports = pingCommand;
