const { createError } = require('./errorUtils');

/**
 * Function to create Embed easier.
 *
 * @param {string} text Text was sayed
 * @param {number} baseLength Length of the animal or other.
 * @return {string} Formatted string
 */
function generateSayText(text, baseLength) {
  const contentLines = generateTextLine(text);
  const lineLength = contentLines.split('\n').length > 2 ? 40 : text.length;

  const startLine = generateLine(lineLength, '_') + '\n';
  const endLine = generateLine(lineLength, '-');

  const sayText = `${startLine}${contentLines}${endLine}`;

  if (sayText.length + baseLength >= 2048) {
    throw createError(
      'Arguments length is too long !',
      '',
      'Make your command with less arguments length.',
      true,
    );
  }

  return sayText;
}

const defaultMaxLength = 40;

function generateTextLine(text) {
  const stringArray = generateTextArray(text);

  if (stringArray.length === 1) {
    return `< ${stringArray[0]} >\n`;
  }

  let string = `/ ${fillString(stringArray[0])} \\\n`;

  for (let i = 1; i < stringArray.length - 1; i++) {
    string += `| ${fillString(stringArray[i])} |\n`;
  }

  string += `\\ ${fillString(stringArray[stringArray.length - 1])} /\n`;

  return string;
}

function generateLine(length, char = '_', maxLength = defaultMaxLength) {
  const lineLength = length < maxLength ? length : maxLength;

  let line = '  ';
  for (let i = 0; i <= lineLength; i++) {
    line += char;
  }

  return line;
}

function fillString(string, maxLength = defaultMaxLength - 1) {
  if (string && string.length === maxLength) {
    return string;
  }

  let missingChar = maxLength - string.length;

  for (let i = 0; i <= missingChar; i++) {
    string += ' ';
  }

  return string;
}

function generateTextArray(text, maxLength = defaultMaxLength) {
  const splitedWords = text.split(' ');
  const textArray = [];

  let index = 0;

  splitedWords.forEach(word => {
    const totalChar =
      ((textArray[index] && textArray[index].length) || 0) + word.length;

    if (totalChar >= maxLength && textArray[index]) {
      index += 1;
    }

    if (textArray[index]) {
      if (word.includes('\n')) {
        const splitedWord = word.split('\n');

        textArray[index] = `${textArray[index]} ${splitedWord[0]}`;
        index++;
        // if multiple \n, put the last correct knew word
        textArray[index] = splitedWord[1] || splitedWord[2] || splitedWord[3];
      } else {
        textArray[index] = `${textArray[index]} ${word}`;
      }
    } else {
      if (word.length > defaultMaxLength) {
        const ratio = Math.ceil(word.length / maxLength);

        for (let i = 0; i < ratio; i++) {
          textArray[i + index] = word.substring(
            i * maxLength,
            (i + 1) * maxLength,
          );
        }

        index += ratio;
      } else {
        if (word.includes('\n')) {
          const splitedWord = word.split('\n');

          textArray[index] = splitedWord[0];
          index++;
          // if multiple \n, put the last correct knew word
          textArray[index] = splitedWord[1] || splitedWord[2] || splitedWord[3];
        } else {
          textArray[index] = word;
        }
      }
    }
  });

  return textArray;
}

module.exports = generateSayText;
