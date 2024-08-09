const deletePostHandler = async (e) => {
    e.preventDefault();
    console.log("Ouch, you clicked me!");
    console.log(e.target);

    let blogPost = window.location.pathname.split('/');
    console.log(blogPost);

    const response = await fetch(`/api/blogPost/${blogPost[2]}`, {
        method: "DELETE"
    })

    if (response.ok) {
        response.location.assign('/dashboard');
    } else {
        alert(response.statusText);
    }
}

const deleteButton = document.querySelectorAll('#deleteBtn');

// For loop -- Iterate over all delete buttons on the page allowing for delete functionallity
for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', deletePostHandler);
}