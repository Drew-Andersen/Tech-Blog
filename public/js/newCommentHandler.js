async function newCommentHandler(e) {
    e.preventDefault();

    console.log('I was clicked!!');

    // Retrieve the text
    const comment_body = document.getElementById('comment').value.trim();
    // Gets the post id from the URL
    const url = window.location.toString().split('/');
    const blogPost_id = url[url.length - 1];

    if (comment_body) {
        const response = await fetch(`/api/comment`, {
            method: 'POST',
            body: JSON.stringify({
                comment_body
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if ( response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
}

// Event Listener
console.log("Listening");
console.log(document.getElementById('comment-form'));

document.getElementById('content-form').addEventListener('submit', newCommentHandler);