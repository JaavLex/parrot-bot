async function onMessage(message) {
 if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g)
  const cmd = args.shift().toLowerCase();

  let command = client.commands.get(cmd);

  if (!command) {
    command = client.commands.get(client.aliases.get(cmd));
  } else {
    command.run(client, message, args);
  }
}

module.exports = onMessage;
