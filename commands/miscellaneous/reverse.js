const { prefix } = require('../../utils/utils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'Reverse parrot bot';

  message.channel.send(getReversedText(sentence));
}

function getReversedText(text) {
  let doubleText = '';

  for (let i = text.length - 1; i >= 0; i--) {
    doubleText += text[i];
  }

  return doubleText;
}

const reverseCommand = {
  name: 'reverse',
  category: 'miscellaneous',
  aliases: ['rever'],
  description: `Send your reversed message..\n\nExemple :\n> ${prefix}reverse hello\n$ olleh`,
  usage: '<text>',
  autoMessageDeletion: false,
  run,
};

module.exports = reverseCommand;
