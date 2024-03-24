const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.rockpapershotgun.com/wordle-past-answers';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const wordList = [];

    // The selector will depend on the actual structure of the webpage
    // This is a generic example and will likely need to be adjusted
    $('ul.inline > li').each(function() {
      const word = $(this).text();
      wordList.push(word);
    });

    console.log(wordList);
  })
  .catch(console.error);