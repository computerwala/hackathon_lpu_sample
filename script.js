document.addEventListener("DOMContentLoaded", function () {
    const reportForm = document.getElementById("reportForm");
    const issueTable = document.getElementById("issueTable");

    const API_BASE_URL = window.location.origin;  // Automatically picks correct backend

    if (reportForm) {
        reportForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const title = document.getElementById("title").value.trim();
            const description = document.getElementById("description").value.trim();
            const location = document.getElementById("location").value.trim();

            if (!title || !description || !location) {
                alert("Please fill in all fields.");
                return;
            }

            fetch(`${API_BASE_URL}/report`, {  // Uses dynamic API URL
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, location })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                loadIssues();
            });
        });
    }

    function loadIssues() {
        fetch(`${API_BASE_URL}/issues`)
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        .then(issues => {
            issueTable.innerHTML = "<tr><th>ID</th><th>Title</th><th>Description</th><th>Location</th><th>Status</th></tr>";
            issues.forEach(issue => {
                issueTable.innerHTML += `<tr><td>${issue.id}</td><td>${issue.title}</td><td>${issue.description}</td><td>${issue.location}</td><td>${issue.status}</td></tr>`;
            });
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
    }

    if (issueTable) {
        loadIssues();
    }
});