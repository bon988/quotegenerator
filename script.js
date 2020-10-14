const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loaderSpinner= document.getElementById('loader');

let apiQuotes = [];

// Show loader spinner
function loading(){
    loaderSpinner.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loader spinner
function loaderComplete() {
    quoteContainer.hidden = false;
    loaderSpinner.hidden = true;
}

//Show new quote
function newQuote(){
    loading();
    // Pick a random quote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author){
        quoteAuthor.textContent = 'Unknown';
    }else{
        quoteAuthor.textContent = quote.author;
    }
    // Check Quote length to determine styling 
    if (quote.text.length > 40){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, hide Loader
    quoteText.textContent = quote.text;
    loaderComplete();
}
    quoteText.textContent = quote.text;
  
// Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `http://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();