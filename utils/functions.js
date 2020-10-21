const styles = {
  // got these from playing around with what I found from:
  // https://github.com/istanbuljs/istanbuljs/blob/0f328fd0896417ccb2085f4b7888dd8e167ba3fa/packages/istanbul-lib-report/lib/file-writer.js#L84-L96
  // they're the best I could find that works well for light or dark terminals
  success: { open: '\u001b[32;1m', close: '\u001b[0m' },
  danger: { open: '\u001b[31;1m', close: '\u001b[0m' },
  info: { open: '\u001b[36;1m', close: '\u001b[0m' },
  subtitle: { open: '\u001b[2;1m', close: '\u001b[0m' },
  logger: { open: '\u001b[34;1m', close: '\u001b[0m' },
};

function consoleColor(modifier, string) {
  return styles[modifier].open + string + styles[modifier].close;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function jaugeBar(
  percentage,
  length = 10,
  { filler = '█', unfiller = ' ' } = {},
) {
  const filledBars = Math.floor(percentage / (100 / length));
  let finalJaugeBar = '`[';

  for (var i = 0; i < length; i++) {
    finalJaugeBar += i <= filledBars ? filler : unfiller;
  }

  finalJaugeBar += `] ${percentage}%\``;

  return finalJaugeBar;
}

exports.consoleColor = consoleColor;
exports.randomNumber = randomNumber;
exports.jaugeBar = jaugeBar;
