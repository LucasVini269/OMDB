const apiKey = '647a05be';
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('results');
const movieInput = document.getElementById('movieInput');

searchBtn.addEventListener('click', () => {
    const query = movieInput.value;
    if (query.length > 2) {
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
            .then(response => response.json())
            .then(data => {
                resultsContainer.innerHTML = '';
                if (data.Response === "True") {
                    data.Search.forEach(movie => {
                        const movieCard = document.createElement('div');
                        movieCard.className = 'movie';
                        movieCard.innerHTML = `
                            <h2>${movie.Title}</h2>
                            <img src="${movie.Poster}" alt="${movie.Title}" style="width: 100%; height: auto;">
                        `;
                        movieCard.addEventListener('click', () => {
                            showMovieDetails(movie.imdbID);
                        });
                        resultsContainer.appendChild(movieCard);
                    });
                } else {
                    resultsContainer.innerHTML = `<p>Nenhum filme encontrado.</p>`;
                }
            })
            .catch(error => console.error('Erro:', error));
    } else {
        resultsContainer.innerHTML = '';
    }
});

function showMovieDetails(imdbID) {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&language=pt-BR`)
        .then(response => response.json())
        .then(movieDetails => {
            resultsContainer.innerHTML = `
                <div class="movie-details">
                    <h2>${movieDetails.Title}</h2>
                    <img src="${movieDetails.Poster}" alt="${movieDetails.Title}" class="detail-img">
                    <p><strong>Ano:</strong> ${movieDetails.Year}</p>
                    <p><strong>Diretor:</strong> ${movieDetails.Director}</p>
                    <p><strong>Atores:</strong> ${movieDetails.Actors}</p>
                    <p><strong>Nota:</strong> ${movieDetails.imdbRating}</p>
                    <p><strong>Resumo:</strong> ${movieDetails.Plot}</p>
                    <button id="backBtn">Voltar</button>
                </div>
            `;
            document.getElementById('backBtn').addEventListener('click', () => {
                resultsContainer.innerHTML = '';
            });
        })
        .catch(error => console.error('Erro:', error));
}
