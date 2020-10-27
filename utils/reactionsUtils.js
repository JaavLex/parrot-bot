function defaultFilter(reaction, user) {
  return !user.bot;
}
// TODO : remove users
/**
 * Function to make Embed creation easier
 *
 * @param {DiscordMessage} message The message who need listen react
 * @param {(emoji: string, message: DiscordMessage, users: Array<any>, user: DiscordUser) => {}} onCollect The message who need listen react //! change user:DiscordUser
 * @param {{onEnd: (emoji: string, message: DiscordMessage, users: Array<any>, user: DiscordUser) => any, onEnd: () => {}, time: number, filter: (reaction: any, user: any) => {}, alwaysCollect: boolean, }} params The title of the embed
 */
function createCollectorMessage(
  message,
  onCollect = () => {},
  {
    onEnd = () => {},
    onRemove = () => {},
    time = 8000,
    filter,
    alwaysCollect = true,
  },
) {
  const collector = message.createReactionCollector(filter || defaultFilter, {
    time, // time after the collector end
    dispose: true,
  });

  collector.on('collect', (reaction, msg) =>
    onCollect(
      reaction.emoji,
      message,
      reaction.users.cache.filter(u => !u.bot),
      msg,
    ),
  );

  const selectedCollect = alwaysCollect ? onCollect : onRemove;
  collector.on('remove', (reaction, msg) =>
    selectedCollect(
      reaction.emoji,
      message,
      reaction.users.cache.filter(u => !u.bot),
      msg,
    ),
  );

  collector.on('end', reaction => {
    onEnd(reaction, message);
  });
}

exports.createCollectorMessage = createCollectorMessage;
