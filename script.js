document.addEventListener('DOMContentLoaded', function() {
    const quoteText = document.getElementById('quote');
    const authorText = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote-button');
    const searchButton = document.getElementById('search-button');
    const authorInput = document.getElementById('author-input');

    async function fetchQuote(author = '') {
        try {
            let url = '/quote';
            if (author) {
                url += `?author=${author}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            quoteText.textContent = `"${data.content}"`;
            authorText.textContent = `- ${data.author}`;
        } catch (error) {
            quoteText.textContent = 'An error occurred while fetching the quote.';
            authorText.textContent = '';
        }
    }

    newQuoteButton.addEventListener('click', () => fetchQuote());
    searchButton.addEventListener('click', () => fetchQuote(authorInput.value));

    // Fetch the initial quote
    fetchQuote();
});
