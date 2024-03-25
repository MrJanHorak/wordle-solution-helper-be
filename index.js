import functions from 'firebase-functions';
import express from 'express';
import cheerio from 'cheerio';
import axios from 'axios';
import cors from 'cors';
import NodeCache from 'node-cache';

const app = express();
app.use(cors());

const cache = new NodeCache();
const cacheKey = "wordle_list";
const scrapeInterval = 24 * 60 * 60; // Cache duration (24 hours in seconds)

app.get("/", (request, response) => {
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

    const wordList = [];
    $('ul.inline > li').each(function() {
      const word = $(this).text();
      wordList.push(word);
    });

    // Update cache with fresh data
    cache.set(cacheKey, { data: wordList, fetchedAt: Date.now() });

    res.json({wordList:1});
  } catch (error) {
    console.error("Error scraping words:", error);
    res.status(500).send("Error fetching word list");
  }
});

export const api = functions.https.onRequest(app);