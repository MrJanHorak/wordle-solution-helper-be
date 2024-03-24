## Wordle-Solution-Helper-Back-End

After about 2 yearsa of having created the Wordle-Solution-Helper I have decided to return to the project and update/upgrade it. I had completed the Spelling Bee Solver and Letter Boxed solver. Then recently a fellow engineer contacted me and ask to purchase the Spelling Bee solverfrom me. 

I had already been contemplating updating these sites, and that was the ecouragement I needed. I sold the Spelling Bee Solver however, have updated the Letter Boxed Solver to auto populate with the current letters. That site currently recieves about 5k visitors a week. So I was wondering what I could add to make the Worlde-Solution-Helper more useful for any of its users.

I found a list of the past 1000 Wordles and decided to add the list into the site, greying out any past Wordles. I didn't like that solution, though it is currently implemented. I wanted to find a way to keep my list updated so I wouldn't have to worry about the list being too outdated. 

This is what this short little script is supposed to help me do. I found a site that updated a list of past Wordle solutions daily and excludes the current Worlde. I wanted to see if I could scrape the word list from the site and serve it to the front end client. 

That is what this code is. A function hosted on Firebase to scrape the web-site and respond to my Worlde-Solution-Helper with the updated wordlist anytime someone visits the site and trys to solve the current Wordle.

