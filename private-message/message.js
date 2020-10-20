async function onPrivateMessage(message, client) {
  await message.channel.send("Hi men, I'm not available in private message.");
}

module.exports = onPrivateMessage;
