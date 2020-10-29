const { createUserEmbed } = require('../discordUtils');
const { createError } = require('../errorUtils');
const { invisibleChar, maxValueInArray } = require('../utils');

/* eslint-disable no-param-reassign */
const emojies = [
  '1️⃣',
  '2️⃣',
  '3️⃣',
  '4️⃣',
  '5️⃣',
  '6️⃣',
  '7️⃣',
  '8️⃣',
  '9️⃣',
  '🔟',
  '🔢',
  '#️⃣',
  '*️⃣',
];

function onEnd(message, embed, question, author) {
  const countAnswers = message.embeds[0].fields.map(({ value, name }, i) => ({
    count: value.split('@').length,
    // remove emoji
    answer: name.substr(name.indexOf(' ') + 1),
  }));
  const { index } = maxValueInArray(countAnswers.map(a => a.count));
  embed.fields[index].name = `✅ ${embed.fields[index].name}`;
  embed.setDescription('⚠️ Pool is finish !');
  message.edit(embed);

  const poolFinishEmbed = createUserEmbed('#27ae60', `🥳 Pool is finish !`, {
    author,
  })
    .setDescription("The poll has just been completed, here's the results.")
    .addField(`> ${question}`, `➡️ ${countAnswers[index].answer}`);

  message.channel.send(poolFinishEmbed);
}

function getEditedFields(emoji, msg, users, embed, ...args) {
  const fields = [...embed.fields];

  const selectedFieldIndex = fields.findIndex(field =>
    field.name.includes(emoji),
  );

  const usersTags = users.map(u => `<@${u.id}>`);

  fields[selectedFieldIndex] = {
    value:
      usersTags.length > 0
        ? `${usersTags.join(', ')} (${usersTags.length})`
        : invisibleChar,
    inline: fields[selectedFieldIndex].inline,
    name: fields[selectedFieldIndex].name,
  };

  return fields;
}

const addAnswers = (answers, embed) =>
  emojies
    .slice(0, answers.length)
    .map((emoji, i) => embed.addField(`${emoji} ${answers[i]}`, invisibleChar));

const addReactions = (kinds, message) =>
  emojies.slice(0, kinds.length).map(emoji => message.react(emoji));

function checkPool(poolKinds) {
  if (poolKinds.length < 3)
    throw createError(
      'Need 2 questions min !',
      '',
      'try /pool question ; answer1 ; answer2',
    );

  if (poolKinds.length > 12)
    throw createError(
      'Max 12 questions !',
      '',
      'try /pool question ; answer1 ; answer2 ... answer12',
    );
}

module.exports = {
  addAnswers,
  addReactions,
  onEnd,
  emojies,
  getEditedFields,
  checkPool,
};