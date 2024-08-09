// Function so users can create a new blog post
async function newPostHandler (e) {
    e.preventDefault();

    // Gets the inputs by thier id's
    const title = document.getElementById('titleInput.').value.trim();
    const description = document.getElementById('bodyInput').value.trim();

    if (title && description) {
        const response = await fetch(`/api/blogPost`, {
            method:"POST",
            body: JSON.stringify({
                title, 
                description
            }),
            headers: {
                "Content-Type": "application.json"
            }
        })

        if (response.ok) {
            document.location.replace('dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

// Event Listener
document.querySelector('.createBlogPost').addEventListener("submit", newPostHandler);