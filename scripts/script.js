// Fetch data from the JSON file and generate the cards
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.cards-container');
        container.innerHTML = data.map(card => `
            <div class="card">
                <img src="${card.image}" alt="Creator Image">
                <div class="card-content">
                    ${card.badges.map(badge => `<span class="badge">${badge}</span>`).join('')}
                    <h3>${card.title}</h3>
                    <div class="rating">
                        <span>⭐ ${card.rating}</span>
                        <span>(${card.reviews})</span>
                        <span>🕒 ${card.duration}</span>
                    </div>
                    <br>
                    <p>by ${card.author}</p>
                    <p class="description">${card.description}</p>
                    <p class="price">${card.price}</p>
                    <!-- Hire Button with Link to Portfolio Page -->
                    <a href="../PORTFOLIO/portfolio.html?id=${card.id}" class="hire-button">Hire</a>
                </div>
            </div>
        `).join('');
    })
    .catch(error => console.error('Error fetching data:', error));
