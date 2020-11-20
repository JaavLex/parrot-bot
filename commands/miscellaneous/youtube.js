const fetch = require('node-fetch');

async function run(client, message, args) {
  const youtubeToken = process.env.YOUTUBE_TOKEN;

  fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=pewdiepie&key=${youtubeToken}`,
  )
    .then(res => res.json())
    .then(async json => {
      console.log(json);
    });
}

const youtubeCommand = {
  name: 'youtube',
  category: 'miscellaneous',
  aliases: ['yt'],
  description: 'Searches for a youtube video',
  autoMessageDeletion: false,
  run,
};

module.exports = youtubeCommand;
