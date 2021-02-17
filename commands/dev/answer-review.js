const { createError } = require('../../utils/errorUtils');

async function run(client, message, args) {
  const reviewLink = args[0];

  if (!reviewLink) throw createError('Invalid `reviewLink` value.');

  const msg = await message.channel.send(
    `ℹ️ @everyone ${message.author.username} needs your review in ${reviewLink} 🚀`,
  );

  msg.suppressEmbeds(true);
}

const gayrateCommand = {
  name: 'needreview',
  aliases: ['nr', 'needre', 'nedre'],
  category: 'dev',
  description: `For developer to answer the review!`,
  usage: '[reviewLink]',
  autoMessageDeletion: true,
  run,
};

module.exports = gayrateCommand;
