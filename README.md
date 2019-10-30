# AcroName - A HackFSU Hackathon Project
Tired of memorizing letters? Trying to stay hip with the times? AcroName is here to help!

## Getting Started
1.  Clone repository
    ```bash
    git clone https://github.com/BaileyWaldorf/HackFSU.git
    ```

2.  Install
    ```bash
    cd HackFSU
    npm run install
    ```

3.  Build and run
    ```bash
    npm run client-build
    npm run backend
    ```
    From the Chrome extension page, click 'Load Unpacked', navigate to `/client/build` and select folder.

### Inspiration
We wanted to leverage the power of internet users to create a crowd-sourced solution to a common problem -- not knowing what that acronym stands for.

### What it does
We inject a small script to scrape your webpage for any words similar to an acronym. We then compare it across our database to tell us what all the different possibilities it could be. By using context clues and help from our users, we can help decrypt that acronym! Oh, we didn't get it right? Submit your own acronyms to help future users :)

### How we built it
With the power of 30 fingers and 3 keyboards, we slapped this together in about 20 hours. Pairing a Google Chrome extension with React was ...fun, and we a had a great time playing with JavaScript.

### Accomplishments that we're proud of
The entire team learned MongoDB for the first time, and a couple of us just broke into React. It's a very exciting time. We are personally super proud of our web-scraping abilities to populate the database, and our willingness not to fall asleep.

### What we learned
A nobel feat of ours was injecting scripts onto pages to mess with their DOM and how time consuming it can be to tailor 7000 lines of CSV data.

### What's next for AcroName
We'd like to improve our prediction algorithm by creating a frequency map of all words on the page to cross reference with our unique tags. This will strengthen our results when stumbling across an ambiguous acronym. We will also be deploying it to the Chrome Web Store so be sure to check there soon. ♥

## Built With
- [x] react
- [x] bootstrap
- [x] node.js
- [x] express.js
- [x] mongodb
