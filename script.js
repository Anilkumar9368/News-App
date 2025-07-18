const API_KEY = 'c19c660031cb4404b3dc3d1c2159fc05';
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

async function fetchNews() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const container = document.getElementById('news-container');
    container.innerHTML = ''; // Clear loader

    if (data.articles && data.articles.length > 0) {
      data.articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
          ${article.urlToImage ? `<img src="${article.urlToImage}" alt="News Image">` : ''}
          <h2>${article.title}</h2>
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        `;
        container.appendChild(card);
      });
    } else {
      container.innerHTML = '<p>No news found.</p>';
    }

  } catch (error) {
    console.error('Error fetching news:', error);
    document.getElementById('news-container').innerHTML = '<p>Error loading news.</p>';
  }
}

fetchNews();
