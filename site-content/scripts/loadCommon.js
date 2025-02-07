function loadHTML(elementId, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('navbar', 'navbar.html');
    loadHTML('footer', 'footer.html');
});
