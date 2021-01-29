const {
  createUserEmbed,
  replaceDiscordTag,
} = require('../../utils/discordUtils');
const { prefix, createMdBlock } = require('../../utils/utils');
const { reactionCollector } = require('../../utils/reactionsUtils');
const {
  checkPoll,
  addAnswers,
  addReactions,
  onEnd,
  getEditedFields,
  emojies,
} = require('../../utils/services/pollServices');

const defaultMinutes = 15;
const maxMinutes = 120;

async function run(client, message, args) {
  const pollKinds = args
    .join(' ')
    .split(';')
    .map(m => replaceDiscordTag(m.trim(), message.guild))
    .filter(m => m.length > 0);

  let minutes = defaultMinutes;
  // if first argument is number, I set minutes value and remove first item of kinds
  if (!Number.isNaN(Number(pollKinds[0]))) {
    minutes = Number(pollKinds[0]) || defaultMinutes; // if minutes is 0, I put the default number !
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

  const usedEmojies = emojies.slice(0, pollKinds.length);

  reactionCollector(sendingMessage, onCollect, {
    alwaysCollect: true,
    onEnd: ({ message: msg }) => onEnd(msg, embed, question, message.author),
    time: minutes * 60000,
    filter: (reaction, user) =>
      usedEmojies.includes(reaction.emoji.name) && !user.bot,
  });

  async function onCollect({ emoji, reaction, message: msg, users }) {
    const fields = getEditedFields(
      emoji,
      msg,
      reaction.users.cache.filter(u => !u.bot),
      msg.embeds[0],
    );
    embed.fields = fields;
    // need to send original embed idk why
    await msg.edit(embed);
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
${createMdBlock(`${prefix}poll 10; Do you like me ?; yes; no`)}
10 will be the time of the survey.

🔴 Maximum **${maxMinutes}** minutes.
🟡 Default **${defaultMinutes}** minutes.

*⚠️ User reactions to the same IP adress may encounter problems.*
`,
  usage: 'question ; first answer ; second answer ...',
  autoMessageDeletion: false,
  customDescription: true,
  run,
};

module.exports = pollCommand;
