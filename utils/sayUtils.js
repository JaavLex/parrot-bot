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
  returnedText += generateLine(text.length, '-');

  return returnedText;
}

// private
function generateCommandBlock(text) {
  const stringArray = generateTextArray(text);
  console.log(stringArray);
  if (stringArray.length === 1) {
    return `< ${stringArray[0]} >\n`;
  }

  let string = `/ ${stringArray[0]} \\\n`;

  for (let i = 1; i < stringArray.length - 1; i++) {
    string += `| ${stringArray[i]} |\n`;
  }

  string += `\\ ${stringArray[stringArray.length - 1]} /\n`;

  return string;
}

function generateLine(length, char = '_', maxLength = 40) {
  if (length < maxLength) {
    let string = '  ';
    for (let i = 0; i <= length; i++) {
      string += char;
    }
    return string + ' \n';
  }

  let string = '  ';

  for (let i = 0; i <= maxLength; i++) {
    string += char;
  }

  return string + ' \n';
}

function generateTextArray(text, maxLength = 40) {
  const splitedWord = text.split(' ');

  let result = [];

  let index = 0;

  splitedWord.forEach(word => {
    const countChar =
      ((result[index] && result[index].length) || 0) + word.length;

    if (countChar >= maxLength) {
      index += 1;
    }

    if (result[index]) {
      result[index] = result[index] + ' ' + word;
    } else {
      result[index] = word;
    }
  });

  return result;
}

module.exports = generateSayText;
