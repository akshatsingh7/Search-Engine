document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchHistory = document.getElementById('searchHistory');
    const clearHistoryButton = document.getElementById('clearHistoryButton');

    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    function updateHistoryDisplay() {
        searchHistory.innerHTML = '';
        history.forEach(term => {
            const li = document.createElement('li');
            li.textContent = term;
            li.classList.add('fade-in');
            searchHistory.appendChild(li);
        });
    }

    function addToHistory(term) {
        if (!history.includes(term)) {
            history.unshift(term);
            if (history.length > 5) {
                history.pop();
            }
            localStorage.setItem('searchHistory', JSON.stringify(history));
            updateHistoryDisplay();
        }
    }

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log(`Searching for: ${searchTerm}`);
            // Here you would typically send the search term to a backend API
            // For this example, we'll just add it to the history
            addToHistory(searchTerm);
            searchInput.value = '';
        }
    }

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    clearHistoryButton.addEventListener('click', () => {
        history = [];
        localStorage.removeItem('searchHistory');
        updateHistoryDisplay();
    });

    updateHistoryDisplay();
});