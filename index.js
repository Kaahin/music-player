// kopplar HTML till JS
const audio = document.querySelector('#audio-player');
const queryInput = document.querySelector('#query');
const searchForm = document.querySelector('#music-form');
const lista = document.querySelector('#lista');

let token = '';

async function getToken () {
    const response = await fetch('https://blooming-reef-63913.herokuapp.com/api/token');
    const data = await response.json();
    token = data.token;
};

getToken();

//https:api.spotify.com/v1/search?q=spirit%20of%20the%20season&type=track

// Anropa spotify api
async function getSongs(song){
    const response = await fetch (`https://api.spotify.com/v1/search?q=${song}&type=track`, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    // console.log(data);
    for(let i = 0; i < data.tracks.items.length; i++){
        // skapar vi en list item 
        const songItem = document.createElement('li');
        songItem.innerHTML = `<img src='${data.tracks.items[i].album.images[0].url}'/><span><p>${data.tracks.items[i].name}</p><button class="track" data-song="${data.tracks.items[i].preview_url}">Play</button></span>`;
        lista.appendChild(songItem);
    };
//  li.innerHTML = `User id:<h1>${value.userId}</h1> Task: <p>${value.title}</p>, completed <small>${value.completed}</small>`;
    const playButtons = document.querySelectorAll('.track');
    for(let i = 0; i < playButtons.length; i++) {
        playButtons[i].addEventListener('click', event => {
            playSong(event.target.dataset.song);
        });
    };
};

//spela låten
function playSong(song) {
    if(song === "null") {
        audio.pause();
        alert('Song could not be played');
    } else {
        audio.src = song;
        audio.play();
    };
};


// Hantera det vi söker?
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const query = queryInput.value;
    getSongs(query);
});