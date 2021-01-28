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
    return `❌ ${message.author.username} request change to the Pull Request #`;
  }
  return `🎬 ${message.author.username} comment the Pull Request #`;
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
  description: `For developer inform review of pull request.

  if approved review result can be : \`['ap', 'approuved', 'a', 'done']\`
  if request change result can be : \`['rc', 'nc', 'nr', 'requestchange', 'needchange', 'change', 'edit']\`
  if just comment result can be what you want.

  if you don't put the \`reviewId\` the message can be bug.`,
  usage: '[reviewResult or reviewId] [reviewId]',
  autoMessageDeletion: true,
  customDescription: true,
  run,
};

module.exports = gayrateCommand;
