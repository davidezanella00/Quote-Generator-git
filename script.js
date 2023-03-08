const quoteConatiner = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const quoteBtn = document.getElementById('new-quote-button');
const loader = document.getElementById('loader');


//global array
let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteConatiner.hidden = true; // when loader is going we want to see the loader and nothing else
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteConatiner.hidden = false; // 
}

// show new quote
function showNewQuote() {
    showLoadingSpinner()
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // if the author field is blank, replace with 'unknown'
    // textContent = property (innertText/innerHtml)
    if(!quote.author) {
        authorText.textContent = 'Davide Zanella';
    }
    else {
        authorText.textContent = quote.author;
    }

    // if quote length > 50 determine the styling
    if(quote.text.length > 120 ) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }
    // set Quote, hide loading
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Tweet Quote
function tweetQuote() {
    // a string for the url with ?text (indicating the parameter text) then back tick for template literals
    const twitterUrl = 'https://twitter.com/intent/tweet?text=' + `${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank') // The window.open() method takes at least two parameters: url and windowName. 
}

// Event Listeners
quoteBtn.addEventListener('click', showNewQuote);
twitterBtn.addEventListener('click', tweetQuote);


// fetch quotes from Api
async function getQuotesApi() {
    showLoadingSpinner()
    // const = proxyUrl = 'https://cors-anywhere.herokuapp.com/' if doesn't work, to add to the fetch 
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        convert = await response.json();
        apiQuotes = convert;
        showNewQuote();
    } catch (error) {
        alert('Api problems', error);
    }
}

getQuotesApi();

