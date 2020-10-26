const { createUserEmbed } = require('../../utils/discordUtils');
const { createError } = require('../../utils/errorUtils');
const { createCollectorMessage } = require('../../utils/reactionsUtils');
const { invisibleChar } = require('../../utils/utils');

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

async function run(client, message, args) {
  let poolKinds = args
    .join(' ')
    .split(';')
    .map(m => m.trim());

  if (poolKinds.length < 3)
    poolKinds = [
      'Quelles est la fortune de Bill Gates en 2020 ?',
      '98 milliards de dollars',
      '99 milliards de dollars',
      '100 milliards de dollars',
      '101 milliards de dollars',
    ];

  checkPool(poolKinds);

  const embed = createUserEmbed('#8e44ad', `🤔 ${poolKinds[0]}`, {
    command: poolCommand.name,
    author: message.author,
  }).setDescription('The pool will finish in 5 minutes.');

  addKinds(poolKinds, embed);

  const sendingMessage = await message.channel.send(embed);

  addReactions(poolKinds, sendingMessage);
  createCollectorMessage(sendingMessage, onCollect, { alwaysCollect: true });

  function onCollect(emoji, msg, users) {
    const fields = getEditedEmbed(emoji, msg, users, msg.embeds[0]);
    embed.fields = fields;
    // need to send original embed idk why
    msg.edit(embed);
  }
}

function getEditedEmbed(emoji, msg, users, embed) {
  const fields = [...embed.fields];

  const selectedFieldIndex = fields.findIndex(field =>
    field.name.includes(emoji),
  );

  fields[selectedFieldIndex] = {
    value: users.map(u => `<@${u.id}>`).join(', ') || invisibleChar,
    inline: fields[selectedFieldIndex].inline,
    name: fields[selectedFieldIndex].name,
  };

  return fields;
}

const addKinds = (kinds, embed) =>
  [...emojies]
    .splice(0, kinds.length - 1)
    .map((emoji, i) =>
      embed.addField(`${emoji} ${kinds[i + 1]}`, invisibleChar),
    );

const addReactions = (kinds, message) =>
  [...emojies]
    .splice(0, kinds.length - 1)
    .map((emoji, i) => message.react(emoji));

function checkPool(poolKinds) {
  if (poolKinds.length < 3) {
    throw createError(
      'Need 2 questions min !',
      '',
      'try /pool question ; answer1 ; answer2',
    );
  }

  if (poolKinds.length > 12) {
    throw createError(
      'Max 12 questions !',
      '',
      'try /pool question ; answer1 ; answer2 ... answer12',
    );
  }
}

const poolCommand = {
  name: 'pool',
  aliases: ['pol', 'pl', 'question', 'form'],
  category: 'ask',
  description: 'Create a pool',
  usage: '[target user]',
  autoMessageDeletion: true,
  run,
};

module.exports = poolCommand;
