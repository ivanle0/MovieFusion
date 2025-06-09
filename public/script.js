
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieResults = document.getElementById('movie-results');

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    movieResults.innerHTML = '';
    
    try {
        const res = await fetch(`/api/omdb?title=${encodeURIComponent(query)}`)
        const data = await res.json();
        if (data.Response === "True") {
            data.Search.forEach(movie => {
                const movieItem = document.createElement('div');
                movieItem.className = 'movie-item';
                movieItem.innerHTML = `<h3>${movie.Title} (${movie.Year})</h3><p>IMDB: ${movie.imdbID}</p>`;
                movieResults.appendChild(movieItem);
            });
        } else {
            movieResults.innerHTML = '<p>No results found.</p>';
        }
    } catch (err) {
        console.error('Error fetching movie data:', err);
        movieResults.innerHTML = '<p>Error fetching movie data.</p>';
    }
    
});
