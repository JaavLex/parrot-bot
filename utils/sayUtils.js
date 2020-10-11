/**
 * Function to create Embed easier.
 *
 * @param {string} text Text was sayed
 * @return {string} Formatted string
 */
function generateSayText(text) {
  let returnedText = '';

  returnedText += generateLine(text.length, '_');
  returnedText += generateCommandBlock(text);
  returnedText += generateLine(text.length, '-', true);

  return returnedText;
}

// private
const defaultMaxLength = 40;

function generateCommandBlock(text) {
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

function generateLine(
  length,
  char = '_',
  isEnd = false,
  maxLength = defaultMaxLength,
) {
  const lineLength = length < maxLength ? length : maxLength;

  let result = '  ';
  for (let i = 0; i <= lineLength; i++) {
    result += char;
  }

  if (isEnd) {
    return result;
  } else {
    return result + ' \n';
  }
}

function fillString(string, maxLength = defaultMaxLength - 1) {
  if (string && string.length === maxLength) {
    return string;
  }

  let result = string;
  let missingChar = maxLength - string.length;

  for (let i = 0; i <= missingChar; i++) {
    result += ' ';
  }

  return result;
}

function generateTextArray(text, maxLength = defaultMaxLength) {
  const splitedWord = text.split(' ');
  let result = [];
  let index = 0;

  splitedWord.forEach(word => {
    const countChar =
      ((result[index] && result[index].length) || 0) + word.length;

    if (countChar >= maxLength && result[index]) {
      index += 1;
    }

    if (result[index]) {
      result[index] = `${result[index]} ${word}`;
    } else {
      if (word.length > defaultMaxLength) {
        const ratio = Math.ceil(word.length / maxLength);

        for (let i = 0; i < ratio; i++) {
          result[i + index] = word.substring(
            i * maxLength,
            (i + 1) * maxLength,
          );
        }

        // TODO ENELVER LES RETOURS ä LIGNE

        index += ratio;
      } else {
        result[index] = word;
      }
    }
  });

  return result;
}

module.exports = generateSayText;
