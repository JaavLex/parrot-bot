const { createError } = require('../../utils/errorUtils');
const { prefix } = require('../../utils/utils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'Double parrot bot';

  if (sentence.length > 1000) {
    throw createError(
      'The result is too long.',
      null,
      'Try with a shorter text.',
    );
  }

  await message.channel.send(getDoubleText(sentence));
}

function getDoubleText(text) {
  let doubleText = '';
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== ' ') {
      doubleText += text[i] + text[i];
    } else {
      doubleText += ' ';
    }
  }

  return doubleText;
}

const doubleCommand = {
  name: 'double',
  category: 'miscellaneous',
  aliases: ['dbl'],
  description: `Send your message with double char.\n\nExemple :\n> ${prefix}double hello\n$ hheelllloo`,
  usage: '<text>',
  autoMessageDeletion: false,
  run,
};

module.exports = doubleCommand;
