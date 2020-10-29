async function run(client, message, args) {
  const sentence = args.join(' ') || 'Double parrot bot';

  message.channel.send(getDoubleText(sentence))
}

function getDoubleText(text) {
  let doubleText = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== " ") {
      doubleText += text[i] + text[i]
    } else {
      doubleText += " "
    }
  }

  return doubleText
}

const doubleCommand = {
  name: 'double',
  category: 'miscellaneous',
  aliases: ['dbl'],
  description: "Send you're message with double char.\n\nExemple :\n> /double hello\n$ hheelllloo",
  usage: '<text>',
  autoMessageDeletion: false,
  run,
};

module.exports = doubleCommand;
