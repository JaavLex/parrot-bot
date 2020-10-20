async function onPrivateMessage(message, client) {
  if (message.author.bot) return;

  await message.channel.send("Hi men, I'm not available in private message.");
}

module.exports = onPrivateMessage;
