const functions = require('firebase-functions');
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');

const app = express();
app.use(cors());

const cache = new NodeCache();
const cacheKey = "wordle_list";
const scrapeInterval = 24 * 60 * 60; // Cache duration (24 hours in seconds)

app.get("/", (req, res) => {
  res.send("Hello from Firebase!");
});

app.get('/scrapeWords', async (req, res) => {
  // Check cache for fresh data
  const cachedWords = cache.get(cacheKey);
  if (cachedWords && Date.now() - cache.get(cacheKey).fetchedAt < scrapeInterval) {
    console.log("Using cached word list");
    return res.json(cachedWords.data);
  }

  try {
    const url = 'https://www.rockpapershotgun.com/wordle-past-answers';
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const wordList = {};
    $('ul.inline > li').each(function() {
      const word = $(this).text();
      wordList[word]=1;
    });

    // Update cache with fresh data
    cache.set(cacheKey, { data: wordList, fetchedAt: Date.now() });
    res.json(wordList);
  } catch (error) {
    console.error("Error scraping words:", error);
    res.status(500).send("Error fetching word list");
  }
});

exports.api = functions.https.onRequest(app);