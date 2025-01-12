async function fetchFilmData(filmID) {
    console.log('Fetching film data...');
    const response = await fetch(`https://p9rw750pga.execute-api.us-east-1.amazonaws.com/default/getFilmInfo/${filmID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
        console.error('Fetch failed:', response.statusText);
        return null;
    }

    const data = await response.json();
    console.log('Received data:', data);
    return data;
}


function createCard(film) {
    const card = document.createElement('div');
    card.className = 'card';

    const title = document.createElement('h3');
    title.textContent = film.FilmTitle;
    card.appendChild(title);

    const image = document.createElement('img');
    image.src = film.FilmThumb;
    card.appendChild(image);

    const address = document.createElement('p');
    address.innerHTML = `<a href="${film.FilmAddress}" target="_blank">Watch Film</a>`;
    card.appendChild(address);

    return card;
}

async function displayFilmData() {
    try {
        const filmID = '1'; // Replace with the ID you want to fetch
        const data = await fetchFilmData(filmID);

        console.log('Display film data:', data);

        if (!data) {
            console.error('No data received');
            return;
        }

        const filmCardsContainer = document.getElementById('film-cards');
        filmCardsContainer.innerHTML = '';

        data.forEach(film => {
            const card = createCard(film);
            filmCardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error displaying film data:', error);
    }
}

// Call the function to fetch and display film data on page load
displayFilmData();
