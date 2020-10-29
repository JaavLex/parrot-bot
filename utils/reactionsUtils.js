const defaultFilter = (reaction, user) => !user.bot;

/**
 * Function to make Embed creation easier
 *
 * @param {Message} message The message who need listen react
 * @param {(emoji: string, message: Message, users: Array<any>, user: User) => {}} onCollect The message who need listen react
 * @param {{onEnd: (emoji: string, message: Message, users: Array<any>, user: User) => any, onEnd: () => {}, time: number, filter: (reaction: any, user: any) => {}, alwaysCollect: boolean, data: any}} params The title of the embed
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
    data,
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
      data,
    ),
  );

  const selectedCollect = alwaysCollect ? onCollect : onRemove;
  collector.on('remove', (reaction, msg) =>
    selectedCollect(
      reaction.emoji,
      message,
      reaction.users.cache.filter(u => !u.bot),
      data,
    ),
  );

  collector.on('end', reaction => {
    onEnd(reaction, message);
  });
}

exports.createCollectorMessage = createCollectorMessage;
