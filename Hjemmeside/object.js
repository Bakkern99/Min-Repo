
//Definerer en album class som repræsenterer individuelle objekter
class Album {
    constructor(id, artist, title, year, tracks, website) {
        this.id = id;           //Unik identiferer til albummet
        this.artist = artist;   //Albummet's artist
        this.title = title;     //Albummet's titel
        this.year = year;       //Året albummet udkom
        this.tracks = tracks;   //Et array af tracks objekter, som hver indeholder tracks detajler
        this.website = website; //URL til artist website
    }

    // Genererer en HTML for albummet
    getAlbumCardHTML() {
        //Genererer html for hver track i albummets trackliste
        const tracklistHTML = this.tracks
        .map(track => `<li>${track.trackNumber}. ${track.trackTitle} (${track.trackTimeInSeconds} sec)</li>`)
        .join(''); //med join samler vi alle vores ting fra tracket i en string
        
        //HTML struktur for albummet
        return `
            <div class="album-card" id="album-${this.id}">
                <div class="album-header">${this.title}</div>
                <div class="album-info">Artist: <a href="${this.website}" target="_blank">${this.artist}</a></div>
                <div class="album-info">Year: ${this.year}</div>
                <button class="show-tracks" onclick="toggleTracklist(${this.id})">Show Tracks</button>
                <ul class="tracklist" id="tracklist-${this.id}">${tracklistHTML}</ul>
            </div>
        `;
    }
}

/* 
Funktionen her er med til at vise/skjule tracklisten for et album og vha. 
if/else kode får vi 2 funktioner med knappen. Enten skjule eller vise.
*/
function toggleTracklist(albumId) {
    const tracklist = document.getElementById(`tracklist-${albumId}`);
    const button = document.querySelector(`#album-${albumId} .show-tracks`);
    if (tracklist.style.display === 'none' || tracklist.style.display === '') {
        tracklist.style.display = 'block';
        button.textContent = 'Hide Tracks';
    } else {
        tracklist.style.display = 'none';
        button.textContent = 'Show Tracks';
    }
}

// Vi loader json data med fetch og så parse vi en respons. 
async function loadAlbumData(url) {
    try {
        const response = await fetch(url);
        const albumData = await response.json();

        // Vi generer et array til album objekter baseret på json-filen med ID, Navn, Titel, produktions år
        // tracklisten og et lille website link, som lidt ekstra sjovt.
        const albums = albumData.map((album, index) => new Album(
            index,
            album.artistName,
            album.albumName,
            album.productionYear,
            album.trackList,
            album.artistWebsite
        ));

        renderAlbums(albums);
    } catch (error) {
        console.error("Error loading album data", error); //Vi logger for at se potentielle fejl
    }
}

// Vi samler det hele her et sted nemlig under album-container, 
// og tilføjer en container for alle andre albums

function renderAlbums(albums) {
    const container = document.getElementById('album-container');
    albums.forEach(album => {
        container.innerHTML += album.getAlbumCardHTML();
    });
}

// Initialiser indlæsning af albumdata fra json-filen
loadAlbumData("albums.json");
