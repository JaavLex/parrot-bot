async function handlerPrivateMessage(message, client) {
  await message.channel.send("Hi men, I'm not available in private message.");
}

module.exports = handlerPrivateMessage;
