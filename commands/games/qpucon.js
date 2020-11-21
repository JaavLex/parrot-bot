const { createUserEmbed, createEmbed } = require('../../utils/discordUtils');
const questions = require('../../utils/data/question.json');
const { randomNumber, invisibleChar } = require('../../utils/utils');
const { messageCollector } = require('../../utils/reactionsUtils');

async function run(client, message) {
  const questionForDumb = new QuestionForDumb(message.channel, message.author);
  questionForDumb.startGame();
}

const QuestionForDumbStates = Object.freeze({
  FIRST: 0,
  SECOND: 1,
  THIRD: 2,
});

class QuestionForDumb {
  constructor(channel, author) {
    this.state = QuestionForDumbStates.FIRST;
    this.channel = channel;
    this.player = author;
    this.game = [];
    // exemple of state : [{index: x, question: {q: "alut", answers: ["ok", "ok"]}, answer: "user answer", isCorrect: false}]
  }

  startGame() {
    this.channel.send(
      createUserEmbed('#009432', 'Début de QQPRun con').setDescription(
        'Le but est de répondre juste aux 3 question blabla donner les règles du jeu',
      ),
    );

    this.answerQuestion();
  }

  async answerQuestion() {
    if (this.state + 1 === this.game.length) {
      if (this.state === QuestionForDumbStates.THIRD) {
        this.endGame();
        return;
      }
      this.state = getNewState(this.state);
    }

    const currentQuestion = getNewQuestion(this.game.map(g => g.index));

    this.game[this.state] = {
      index: currentQuestion.index,
      question: currentQuestion.question,
      answers: null,
      answer: null,
      isCorrect: null,
    };

    await this.channel.send(createQuestionEmbed(currentQuestion, this.state));

    messageCollector(this.channel, onCollect, {
      filter: msg => msg.author.id === this.player.id,
      time: 1000 * 15,
      onEnd: this.onEnd.bind(this),
      data: {
        game: this.game[this.state],
        setGameState: this.setGameState.bind(this),
      },
    });
  }

  onEnd({ collects }) {
    if (collects.size !== 0) return;

    this.channel.send('Le temps est terminé! Tu as perdu!');
    this.setGameState({ answer: 'null', isCorrect: false });
  }

  endGame() {
    const embed = createEmbed('#111111', 'Recap');
    const points = this.game.filter(g => g.isCorrect).length;

    this.game.forEach(g => {
      const [correctSentence, re] = g.question.correct;
      const reggex = new RegExp(re, 'i');

      const correctIndex = g.question.answers.findIndex(a => a.match(reggex));

      const win = isAnswerCorrect(g.answer, correctIndex, reggex);

      embed.addField(
        g.question.q,
        `Ta réponse : ${g.answer} ${win ? '✅' : '❌'} ${
          !win ? correctSentence : ''
        }`,
      );
    });

    embed.setDescription(
      points === 3 ? 'Tu as gagné bg !' : `Tu as perdu ${points}/3 !`,
    );

    this.channel.send(embed);
  }

  setGameState(newStates) {
    this.game[this.state] = {
      ...this.game[this.state],
      ...newStates,
    };
    this.answerQuestion();
  }
}

function isAnswerCorrect(content, correctIndex, reggex) {
  if (!Number.isNaN(Number(content))) {
    const contentNumber = Number(content);

    if (correctIndex + 1 === contentNumber) {
      return true;
    }
  }

  if (content.match(reggex)) {
    return true;
  }
  return false;
}

function onCollect({ message, data, stop }) {
  const { content } = message;
  const {
    game: {
      question: { correct, answers },
    },
    setGameState,
  } = data;
  const [, re] = correct;
  const reggex = new RegExp(re, 'i');

  const correctIndex = answers.findIndex(a => a.match(reggex));

  const win = isAnswerCorrect(content, correctIndex, reggex);

  !win && message.channel.send("Nul t'as perdu !\n----------\n");
  win && message.channel.send('Bravo tu as gagné !\n----------\n');
  setGameState({ answer: content, isCorrect: win });
  stop();
}

const colors = ['#f1c40f', '#e67e22', '#e74c3c'];

function createQuestionEmbed(state, step) {
  const {
    question: { q, answers },
  } = state;

  const embed = createEmbed(colors[step], `Question : ${q}`).setDescription(
    "Pour répondre envoie un message dans le channel. Attention, tu ne peux envoyé qu'un message, avec la réponse ou le numéro de la réponse ! Tu as 10 secondes.",
  );
  addAnswers(answers, embed);
  return embed;
}

const addAnswers = (answers, embed) =>
  answers.map((answer, index) =>
    embed.addField(`${String(index + 1)} - ${answer}`, invisibleChar),
  );

function getNewQuestion(gameQuestionsId) {
  let randomIndex = randomNumber(0, questions.FR.length - 1);

  while (gameQuestionsId.includes(randomIndex))
    randomIndex = randomNumber(0, questions.FR.length - 1);

  return { index: randomIndex, question: questions.FR[randomIndex] };
}

function getNewState(qfud) {
  return QuestionForDumbStates[Object.keys(QuestionForDumbStates)[qfud + 1]];
}

const russianrouletteCommand = {
  name: 'qprcon',
  category: 'games',
  aliases: ['qu'],
  description: '1 out of 6 chance to shoot yourself be careful !',
  autoMessageDeletion: true,
  run,
};

module.exports = russianrouletteCommand;
