const functions = require('firebase-functions');
const axios = require('axios');
const cheerio = require('cheerio');

exports.scrapeWords = functions.https.onRequest((request, response) => {
  const url = 'https://www.rockpapershotgun.com/wordle-past-answers';

  axios.get(url)
    .then(res => {
      const html = res.data;
      const $ = cheerio.load(html);
      const wordList = [];

      $('ul.inline > li').each(function() {
        const word = $(this).text();
        wordList.push(word);
      });
      response.send(wordList);
    })
    .catch(error => {
      console.error(error);
      response.status(500).send(error);
    });
});