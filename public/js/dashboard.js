const deletePostHandler = async (e) => {
    e.preventDefault();
    console.log('I was clicked');
    console.log(e.target);

    let blogPostId = e.target.getAttribute('data-id');
    console.log(blogPostId);

    const response = await fetch(`/api/blogPost/${blogPostId}`, {
        method:'DELETE'
    })

    if (response.ok) {
        document.location.assign('/dashboard');
    } else {
        alert(response.statusText);
    }
}

// Function to edit blog post on dashboard by redirecting the user to the /create/:id
const editBlogPost = async (e) => {
    e.preventDefault();
    console.log('Clicked');

    let blogPostId = e.target.getAttribute('data-id');

    document.location.assign(`/create/${blogPostId}`);
}

const editButton = document.querySelectorAll('#editBtn');

// For loop -- Iterates over all buttons on the page and allows for edit funcitonallity
for (let i = 0; i < editButton.length; i++) {
    editButton[i].addEventListener('click', editBlogPost);
}

const deleteButton = document.querySelectorAll('#deleteBtn');

// For loop -- Iterates over all buttons on the page and allows for delete funcitonallity
for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', deletePostHandler);
}