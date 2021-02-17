const { createError } = require('../../utils/errorUtils');

const approvedList = ['ap', 'approuved', 'a', 'done'];
const requestChangeList = [
  'rc',
  'nc',
  'nr',
  'requestchange',
  'needchange',
  'change',
  'edit',
];

function getPullRequestTextReview(result, message) {
  if (approvedList.includes(result)) {
    return `✅ ${message.author.username} approved the Pull Request #`;
  }
  if (requestChangeList.includes(result)) {
    return `❌ ${message.author.username} requested changes on the Pull Request #`;
  }
  return `🎬 ${message.author.username} commented on the Pull Request #`;
}

async function run(client, message, args) {
  const reviewResult = args[0];
  const reviewId = args[1];

  if (!reviewResult) throw createError('Invalid `reviewId` value.');

  let textMessage = getPullRequestTextReview(reviewResult, message);
  textMessage += reviewId || Number(reviewResult) || '?';

  await message.channel.send(textMessage);
}

const gayrateCommand = {
  name: 'review',
  aliases: ['re', 'review-done', 'rev', 'revi', 'revie'],
  category: 'dev',
  description: `A developper's command to inform about the review of a pull-request on github.

  If you approved a pull request use the following args : \`['ap', 'approuved', 'a', 'done']\`
  If you requested changes on a pull request use the following args : \`['rc', 'nc', 'nr', 'requestchange', 'needchange', 'change', 'edit']\`
  If you just commented on the pull request, the arg can be anything you want.

  if you don't put the \`reviewId\` the message can be buggy.`,
  usage: '[reviewResult or reviewId] [reviewId]',
  autoMessageDeletion: true,
  customDescription: true,
  run,
};

module.exports = gayrateCommand;
