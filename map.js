var map = L.map('map').setView([40.7128, -74.0060], 12); // NYC default

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function loadIssues() {
    fetch('/issues')
        .then(response => response.json())
        .then(data => {
            data.forEach(issue => {
                let marker = L.marker([issue.lat, issue.lon]).addTo(map)
                    .bindPopup(`<b>${issue.description}</b><br>Status: ${issue.status}`);
            });
        });
}

// Load issues when the page loads
loadIssues();

// Real-time updates every 10 seconds
setInterval(loadIssues, 10000);
