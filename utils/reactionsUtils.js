const defaultFilter = (reaction, user) => !user.bot;

/**
 * Make a reaction collector with function callback
 *
 * @param {Message} message The message who listen reaction
 * @param {(emoji: string, message: Message, users: Array<any>, user: User) => {}} onCollect Function called all reaction added and reaction removed if you turn on `alwaysCollect`
 * @param {{onEnd: (emoji: string, message: Message, users: Array<any>, user: User) => any, onEnd: () => {}, time: number, filter: (reaction: any, user: any) => {}, alwaysCollect: boolean, data: any }} params Params of the reaction
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
