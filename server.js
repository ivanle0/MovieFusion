require('dotenv').config();
const express = require('express'); 
const axios = require('axios');
const db = require('./db.js'); // Connect to the database
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); 
app.use(express.static('public')); // Serve static files from the 'public' directory


//OMDB Route
app.get('/api/omdb', async (req, res) => {
    const title = req.query.title;
    const apiKey = process.env.OMDB_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'OMDB API key is not configured' });
    }
    if (!title) {
        return res.status(400).json({ error: 'Title query parameter is required' });
    }

    try {
        const omdbURL = "https://www.omdbapi.com/";
        const response = await axios.get(omdbURL, {
            params: {
                apikey: apiKey,
                s: title
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from OMDB API:', error);
        res.status(500).json({ error: 'Failed to fetch data from OMDB API' });  
    }
});

//TMDB Route
app.get('/api/tmdb/search', async (req, res) => {
    const title = req.query.title;
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'TMDB API key is not configured' });
    }
    if (!title) {
        return res.status(400).json({ error: 'Title query parameter is required' });
    }

    try {
        const tmdbURL = "https://api.themoviedb.org/3/search/movie";
        const response = await axios.get(tmdbURL, {
            params: {
                api_key: apiKey,
                query: title
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from TMDB API:', error);
        res.status(500).json({ error: 'Failed to fetch data from TMDB API' });  
    }
});

// Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


// Examples of API calls:
// http://localhost:3000/api/omdb?title=inception
// http://localhost:3000/api/tmdb/search?title=inception
