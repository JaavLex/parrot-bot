const { createUserEmbed } = require('../../utils/discordUtils');
const { prefix } = require('../../utils/utils');
const { createCollectorMessage } = require('../../utils/reactionsUtils');
const {
  checkPoll,
  addAnswers,
  addReactions,
  onEnd,
  getEditedFields,
} = require('../../utils/services/pollServices');

const defaultMinutes = 15;
const maxMinutes = 120;

async function run(client, message, args) {
  const pollKinds = args
    .join(' ')
    .split(';')
    .map(m => m.trim());

  let minutes = defaultMinutes;
  // if first argument is number, I set minutes value and remove first item of kinds
  if (!Number.isNaN(Number(pollKinds[0]))) {
    minutes = Number(pollKinds[0]);
    if (minutes > maxMinutes) minutes = maxMinutes;
    pollKinds.splice(0, 1);
  }

  const finishAt = new Date(new Date().getTime() + minutes * 60000);

  checkPoll(pollKinds);
  const [question, ...answers] = pollKinds;

  const embed = createUserEmbed('#8e44ad', `🤔 ${question}`, {
    author: message.author,
  }).setDescription(
    `The poll will finish in ${minutes} minutes at ${finishAt.toLocaleTimeString()}.`,
  );
  addAnswers(answers, embed);

  const sendingMessage = await message.channel.send(embed);
  addReactions(answers, sendingMessage);

  createCollectorMessage(sendingMessage, onCollect, {
    alwaysCollect: true,
    onEnd: (emoji, msg) => onEnd(msg, embed, question, message.author),
    time: minutes * 60000,
  });

  function onCollect(emoji, msg, users) {
    const fields = getEditedFields(emoji, msg, users, msg.embeds[0]);
    embed.fields = fields;
    // need to send original embed idk why
    msg.edit(embed);
  }
}

const pollCommand = {
  name: 'poll',
  aliases: ['pol', 'pl', 'question', 'form', 'survey', 'surve'],
  category: 'ask',
  description: `
Simply create a poll (survey) !

You can choose after how long it ends.
Exemple :
> ${prefix}poll 10; Do you like me ?; yes; no

10 will be the time of the survey.
🔴 Maximum ${maxMinutes} minutes.
🟡 Default ${defaultMinutes} minutes.

⚠️ User reactions to the same IP adress may encounter problems.
`,
  usage: 'question ; first answer ; second answer ...',
  autoMessageDeletion: false,
  run,
};

module.exports = pollCommand;
