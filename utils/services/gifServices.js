const giphy = require('giphy-api')();
const { createError } = require('../errorUtils');
const { randomNumber } = require('../utils');

async function getGifApi(searchItem) {
  const result = await giphy.search(searchItem).then(response => {
    if (!response || !response.data) {
      throw createError(
        'An error was encountered.',
        '',
        'Retry command !',
        true,
      );
    }

    const imageData = response.data[randomNumber(0, 25)];

    const isValid = imageData ? Boolean(imageData.images) : false;
    if (!isValid) {
      throw createError(
        'No results to your query were found!',
        'Your query could not be found by the giphy API.',
        'Try to specify your query in a short specific keyword',
        true,
      );
    }
    return imageData.images.original.url;
  });

  return result;
}

module.exports = getGifApi;
