const UrlParser = require('url').URL;
const { default: fetch } = require('node-fetch');

/**
 * If more than one emoji, use custom add emojies to do not crash the bot in PRODUCTION !
 *
 * @param {Array<string>} Emojies to send Array of promise who run one by one
 * @param {Message} message Discord message to add reaction
 * @return {void}
 */
function addEmojies(emojies, message) {
  const promesses = emojies.map(emoji => {
    const url = new UrlParser(
      `https://discord.com/api/v6/channels/${message.channel.id}/messages/${message.id}/reactions/${emoji}/@me`,
    );
    const headers = {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    };

    return () => fetch(url.href, { headers, method: 'PUT' });
  });

  runPromisesAsync(promesses);
}

/**
 * Run promises async and in the order. He retry one time if promise is false
 *
 * @param {Array<Promise>} promises Array of promise who run one by one
 * @param {number} retryCount Count of retry TO THE SAME PROMISE
 * @return {void}
 */
async function runPromisesAsync(promises, retryCount = 0) {
  if (!promises) return;
  if (!promises.length === 0) return;

  const [promise, ...restPromises] = promises;

  if (typeof promise !== 'function') return;

  const result = await promise();

  if (result.ok || retryCount >= 1) {
    setTimeout(() => runPromisesAsync(restPromises), 250);
  } else {
    setTimeout(() => runPromisesAsync(promises, retryCount + 1), 250);
  }
}

module.exports = {
  addEmojies,
  runPromisesAsync,
};
