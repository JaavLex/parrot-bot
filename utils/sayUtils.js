/**
 * Function to create Embed easier.
 *
 * @param {string} text Text was sayed
 * @return {string} Formatted string
 */
function generateSayText(text) {
  let returnedText = '';

  returnedText += generateLine(text.length, '_');

  return returnedText;
}

// private
function generateLine(length, char = '_') {
  if (length < 40) {
    let string = '  ';
    for (let i = 0; i <= length; i++) {
      string += char;
    }
    return string + ' \n';
  }

  let string = '  ';

  for (let i = 0; i <= 40; i++) {
    string += char;
  }
  return string + ' \n';
}

function generateText(text) {
  const splitedWord = text.split(' ');

  let result = [];
  let index = 0;

  let countChar = 0;

  splitedWord.forEach(word => {
    countChar = countChar + word.length;

    if (countChar <= 40) {
      const newValue = result[index] ? result[index] + ' ' + word : word;

      result[index] = newValue;
    } else {
      countChar = 0;
      index += 1;
      const newValue = result[index] ? result[index] + ' ' + word : word;

      result[index] = newValue;
    }
  });

  return result;
}

module.exports = generateSayText;
