const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');
let apiQuotes = [];

//Show Loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

//Hide Loading
const complete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

//Show new quote
const newQuote = function () {
  loading();
  const randomIndex = Math.floor(Math.random() * apiQuotes.length) + 1;
  const quote = apiQuotes[randomIndex];

  //Shortcircuiting for null values of author
  //quote.author = null;
  authorText.textContent = quote.author || 'Unknown';

  //Reduce text size if quote long
  if (quote.text.length > 50) quoteText.classList.add('long-quote');
  else quoteText.classList.remove('long-quote');
  quoteText.textContent = quote.text;
  complete();
};

//API
const getQuotes = async function () {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();

    newQuote(apiQuotes);
  } catch (error) {
    console.log(error);
  }
};

//Tweet Quote
const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
};

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();
// loading();
