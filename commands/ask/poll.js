const { createUserEmbed } = require('../../utils/discordUtils');
const { prefix } = require('../../utils/utils');
const { createCollectorMessage } = require('../../utils/reactionsUtils');
const {
  checkPool,
  addAnswers,
  addReactions,
  onEnd,
  getEditedFields,
} = require('../../utils/services/pollServices');

const defaultMinutes = 15;
const maxMinutes = 120;

async function run(client, message, args) {
  const poolKinds = args
    .join(' ')
    .split(';')
    .map(m => m.trim());

  let minutes = defaultMinutes;
  // if first argument is number, I set minutes value and remove first item of kinds
  if (!Number.isNaN(Number(poolKinds[0]))) {
    minutes = Number(poolKinds[0]);
    if (minutes > maxMinutes) minutes = maxMinutes;
    poolKinds.splice(0, 1);
  }

  checkPool(poolKinds);
  const [question, ...answers] = poolKinds;

  const embed = createUserEmbed('#8e44ad', `🤔 ${question}`, {
    command: pollCommand.name,
    author: message.author,
  }).setDescription(`The pool will finish in ${minutes} minutes.`);
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
`,
  usage: 'question ; first answer ; second answer ...',
  autoMessageDeletion: false,
  run,
};

module.exports = pollCommand;
