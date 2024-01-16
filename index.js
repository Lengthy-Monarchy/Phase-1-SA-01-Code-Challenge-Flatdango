document.addEventListener("DOMContentLoaded", () => {
    fetchFilms();

    document.getElementById("buy-ticket").addEventListener("click", buyTicket);
});

function fetchFilms() {
    fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(data => {
            films = data;
            displayFilms(films);
        })
        .catch(error => console.error('Error:', error));
}

function displayFilms(films) {
    const filmsList = document.getElementById("films-list");
    filmsList.innerHTML = "";
    films.forEach(film => {
        const filmElement = document.createElement("div");
        filmElement.innerText = film.title;
        filmElement.classList.add("film-item");
        filmElement.onclick = () => displayFilmDetails(film);
        filmsList.appendChild(filmElement);
    });
}

function displayFilmDetails(film) {
    document.getElementById("film-title").innerText = film.title;

    const poster = document.getElementById("film-poster");
    poster.src = film.poster;
    poster.alt = film.title + " Poster";
    poster.style.display = 'block'; 

    const details = document.getElementById("film-details");
    details.innerHTML += `
        <p>Runtime: ${film.runtime} minutes</p>
        <p>Showtime: ${film.showtime}</p>
        <p>Description: ${film.description}</p>
    `;
    updateTicketCounter(film);
}

function updateTicketCounter(film) {
    const counter = document.getElementById("ticket-counter");
    const availableTickets = film.capacity - film.tickets_sold;
    counter.innerText = availableTickets > 0 ? `Tickets Available: ${availableTickets}` : 'Sold Out';
    document.getElementById("buy-ticket").disabled = availableTickets === 0;
}

function buyTicket() {
    const film = getSelectedFilm();
    if (film && film.capacity > film.tickets_sold) {
        film.tickets_sold++;
        updateTicketCounter(film);
    }
}

function getSelectedFilm() {
    const details = document.getElementById("film-details");
    const title = details.querySelector("h2").innerText;
    return films.find(film => film.title === title);
}

