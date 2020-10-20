function handlerPrivateMessage(message, client) {
  message.channel.send("Hi men, I'm not available in private message.");
}

module.exports = handlerPrivateMessage;
