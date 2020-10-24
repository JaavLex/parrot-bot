const { createUserEmbed } = require('../../utils/discordUtils');
const { createError } = require('../../utils/errorUtils');
const { invisibleChar } = require('../../utils/functions');

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
  const splitedMessage = args
    .join(' ')
    .split(';')
    .map(m => m.trim());

  if (splitedMessage.length < 3) {
    // ! DESTROY
    splitedMessage[0] = 'Question';
    splitedMessage[1] = 'Answer1';
    splitedMessage[2] = 'Answer2';
    // ! DESTROY
    // throw createError(
    //   'Need 2 question min !',
    //   '',
    //   'try /pool question ; answer1 ; answer2',
    // );
  }

  if (splitedMessage.length > 12) {
    throw createError(
      'Max 12 question !',
      '',
      'try /pool question ; answer1 ; answer2 ... answer12',
    );
  }

  const embed = createUserEmbed('#8e44ad', 'Pool', {
    command: poolCommand.name,
    author: message.author,
  }).setDescription(splitedMessage[0]);

  for (let i = 1; i < splitedMessage.length; i++) {
    // is an invisible char here !
    embed.addField(`${emojies[i - 1]} ${splitedMessage[i]}`, invisibleChar);
  }

  await message.channel.send(embed).then(async mess => {
    for (let i = 1; i < splitedMessage.length; i++) {
      mess.react(emojies[i - 1]);
    }

    mess.awaitReactions(async (msg, user) => {
      // eslint-disable-next-line no-underscore-dangle
      const emoji = msg.users.reaction._emoji.name;
      const fields = [...embed.fields];

      const selectedFieldIndex = fields.findIndex(field =>
        field.name.includes(emoji),
      );

      fields[selectedFieldIndex] = {
        name: 'salut',
        ...fields[selectedFieldIndex],
      };

      embed.fields = fields;

      await t.edit('pute');
    });
  });

  // mess.awaitReactions((mes, user) => {
  //   console.log('yo', mes, 'blabla', user, 'embed :', embed);
  // });
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
