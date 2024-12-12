import express = require('express');
import axios = require('axios');
import cheerio = require('cheerio');
import cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/articles', async (req, res) => {
    try {
        const response = await axios.get('https://www.bbc.com', {
            headers: {
                'type': 'crawler',
                'User-Agent': 'Mozilla/5.0 (compatible; crawler-bot/1.0)'
            }
        });

        const html = response.data;
        const $ = cheerio.load(html);

        const articles = [];

        
        $('.sc-93223220-0').each((index, element) => {
            const title = $(element).find('h2').text().trim();  
            const description = $(element).find('p').text().trim();  
            const link = $(element).find('a').attr('href'); 

            if (title && description && link) {
                articles.push({ title, description, link: `https://www.bbc.com${link}` });
            }
        });

        if (articles.length === 0) {
            console.log('No articles found.');
        }

        res.json(articles);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from BBC.' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
