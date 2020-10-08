async function onMessage(message) {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  let command = client.commands.get(args);

  if (!command) {
    command = client.commands.get(client.aliases.get(args));
  }

  if (command) command.run(client, message, args);
}

module.exports = onMessage;
