module.exports = {
    name: 'ping',
    category: 'info',
    description: 'Returns latency and API ping',
    run: async (client, message, args) => {
        const {
            MessageEmbed
        } = require('discord.js');

        const msg = await message.channel.send(`✍️ Pinging ... ✍️`);
        const newmsg = new MessageEmbed()
            .setColor('#ff9900')
            .setTitle('Latency')
            .addField(
                'Bot Latency :',
                `${Math.floor(msg.createdAt - message.createdAt)} ms`,
            )
            .addField('API Latency :', `${Math.round(client.ping)} ms`)
            .setTimestamp();
        msg.edit(newmsg);
    },
};