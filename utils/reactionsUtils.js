const defaultFilter = (reaction, user) => !user.bot;

/**
 * Make a reaction collector with function callback
 *
 * @param {Message} message The message who listen reaction
 * @param {(emoji: string, message: Message, users: Array<any>, user: User) => {}} onCollect Function called all reaction added and reaction removed if you turn on `alwaysCollect`
 * @param {{onEnd: (emoji: string, message: Message, users: Array<any>, user: User) => any, onEnd: () => {}, time: number, filter: (reaction: any, user: any) => {}, alwaysCollect: boolean, data: any }} params Params of the reaction
 */
function reactionCollector(
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
  const selectedCollect = alwaysCollect ? onCollect : onRemove;
  const collector = message.createReactionCollector(filter || defaultFilter, {
    time, // time after the collector end
    dispose: alwaysCollect || Boolean(selectedCollect),
  });

  collector.on('collect', (reaction, msg) =>
    onCollect({
      emoji: reaction.emoji,
      message,
      reaction,
      data,
      stop: collector.stop,
    }),
  );

  collector.on('remove', (reaction, msg) =>
    selectedCollect({
      emoji: reaction.emoji,
      message,
      reaction,
      data,
      stop: collector.stop,
    }),
  );

  collector.on('end', reaction => {
    onEnd({
      message,
      reaction,
      data,
    });
  });

  return collector;
}

/**
 * Make a reaction collector with function callback
 *
 * @param {Message} channel The message who listen reaction
 * @param {(emoji: string, message: Message, users: Array<any>, user: User) => {}} onCollect Function called all reaction added and reaction removed if you turn on `alwaysCollect`
 * @param {{onEnd: (emoji: string, message: Message, users: Array<any>, user: User) => any, onEnd: () => {}, time: number, filter: (reaction: any, user: any) => {}, alwaysCollect: boolean, data: any }} params Params of the reaction
 */
function messageCollector(
  channel,
  onCollect = () => {},
  { onEnd = () => {}, time = 8000, filter, data },
) {
  const collector = channel.createMessageCollector(filter || defaultFilter, {
    time, // time after the collector end
  });

  collector.on('collect', message =>
    onCollect({ message, data, stop: collector.stop.bind(collector) }),
  );

  collector.on('end', collects => {
    onEnd({
      data,
      collects,
    });
  });

  return collector;
}

exports.reactionCollector = reactionCollector;
exports.messageCollector = messageCollector;
