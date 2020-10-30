const { prefix } = require('../../utils/utils');

async function run(client, message, args) {
  const sentence = args.join(' ') || 'Fool parrot bot';

  message.channel.send(getFoolText(sentence));
}

function getFoolText(text) {
  let copiedText = text;
  let foolText = '';

  let i = 0;
  while (i < copiedText.length) {
    if (copiedText[i] === ' ') {
      copiedText = copiedText.slice(0, i) + copiedText.slice(i + 1);
      foolText += ' ';
    } else {
      if (i % 2 === 0) foolText += copiedText[i].toUpperCase();
      else foolText += copiedText[i].toLowerCase();
      i++;
    }
  }

  return foolText;
}

const foolCommand = {
  name: 'fool',
  category: 'miscellaneous',
  aliases: ['fol'],
  description: `Send you're message with fool styles..\n\nExemple :\n> ${prefix}fool hello\n$ HeLlO`,
  usage: '<text>',
  autoMessageDeletion: false,
  run,
};

module.exports = foolCommand;
