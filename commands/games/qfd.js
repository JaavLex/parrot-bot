const { QuestionForDumb } = require('../../utils/services/qfdServices');

async function run(client, message) {
  const questionForDumb = new QuestionForDumb(message.channel, message.author);
  questionForDumb.startGame();
}

const russianrouletteCommand = {
  name: 'qfd',
  category: 'games',
  aliases: ['qu', 'qpruncon', 'con', 'questions'],
  description: '1 out of 6 chance to shoot yourself be careful !',
  autoMessageDeletion: true,
  run,
};

module.exports = russianrouletteCommand;
