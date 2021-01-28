const { createUserEmbed, createEmbed } = require('../discordUtils');
const { messageCollector } = require('../reactionsUtils');
const { invisibleChar, randomNumber } = require('../utils');
const questions = require('../data/question.json');

const QuestionForDumbStates = Object.freeze({
  FIRST: 0,
  SECOND: 1,
  THIRD: 2,
});

const CurrentTrad = 'FR';
const I18n = questions[`${CurrentTrad}_RULES`];

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
      createUserEmbed('#009432', I18n.start_title).setDescription(
        I18n.start_desc,
      ),
    );

    messageCollector(
      this.channel,
      ({ stop }) => {
        stop();
        this.answerQuestion();
      },
      {
        filter: msg => msg.author.id === this.player.id,
        time: 1000 * 10,
        onEnd: this.onEnd.bind(this),
        data: {
          game: this.game[this.state],
          setGameState: this.setGameState.bind(this),
        },
      },
    );
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

    this.channel.send(`${I18n.time_up}\n\n--- Next ---`);
    this.setGameState({ answer: 'null', isCorrect: false });
  }

  endGame() {
    const embed = createEmbed('#111111', I18n.recap_title);
    const points = this.game.filter(g => g.isCorrect).length;

    this.game.forEach(g => {
      if (!g.question) {
        // eslint-disable-next-line no-console
        console.error('Invalid game :', g);
        return;
      }

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
      points === 3 ? I18n.recap_win : `${I18n.recap_loose} (${points}/3)`,
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

  if (win) {
    message.channel.send(`${I18n.win}\n\n--- Next ---`);
  } else {
    message.channel.send(`${I18n.loose}\n\n--- Next ---`);
  }
  setGameState({ answer: content, isCorrect: win });
  stop();
}

const colors = ['#f1c40f', '#e67e22', '#e74c3c'];

function createQuestionEmbed(state, step) {
  const {
    question: { q, answers },
  } = state;

  const embed = createEmbed(colors[step], `Question : ${q}`).setDescription(
    I18n.question_rules,
  );
  addAnswers(answers, embed);
  return embed;
}

const addAnswers = (answers, embed) =>
  answers.map((answer, index) =>
    embed.addField(`${String(index + 1)} - ${answer}`, invisibleChar),
  );

function getNewQuestion(gameQuestionsId) {
  let randomIndex = randomNumber(0, questions[CurrentTrad].length - 1);

  while (gameQuestionsId.includes(randomIndex))
    randomIndex = randomNumber(0, questions[CurrentTrad].length - 1);

  return { index: randomIndex, question: questions[CurrentTrad][randomIndex] };
}

function getNewState(qfud) {
  return QuestionForDumbStates[Object.keys(QuestionForDumbStates)[qfud + 1]];
}

module.exports = {
  QuestionForDumb,
};
