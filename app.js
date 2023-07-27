const searchInput = document.getElementById("search-input");
const libraryKeyInput = document.getElementById("library-key-input");
const searchButton = document.getElementById("search-button");
const searchForm = document.getElementById("search-form");

searchInput.addEventListener("input", setButtonState);
libraryKeyInput.addEventListener("input", setButtonState);

function setButtonState() {
    searchButton.disabled = searchInput.value.length === 0 || libraryKeyInput.value.length === 0
}

function saveLibraries() {
    let libArray = parseLibraries();
    localStorage.setItem('libraries', JSON.stringify(libArray))
}

function loadLibraries() {
    let storedVal = localStorage.getItem('libraries')
    if (storedVal) {
        libraryKeyInput.value = JSON.parse(storedVal).join('\n')
    }
}

function parseLibraries() {
    return libraryKeyInput.value.split('\n').map(e => e.trim()).filter(e => e !== '');
}

function generateLibbyUrl(libraryKey, query) {
    let urlEncodedQuery = encodeURIComponent(query)
    return "https://libbyapp.com/search/" + libraryKey + "/search/query-" + urlEncodedQuery + "/page-1"
}

function submit(event) {
    event.preventDefault();
    saveLibraries()

    let searchQuery = searchInput.value
    let libraryKeyArray = parseLibraries()
    for (var i = 0; i < libraryKeyArray.length; i++) {
        window.open(generateLibbyUrl(libraryKeyArray[i], searchQuery), '_blank')
    }
}

function init() {
    loadLibraries()
    setButtonState()
    searchForm.onsubmit = submit
}

window.onload = init;
