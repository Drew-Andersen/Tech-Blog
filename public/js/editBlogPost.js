let blogPost = window.location.pathname.split('/');

// Function to edit a blog post
const editPost = async (e) => {
    e.preventDefault();

    console.log("I was clicked");

    const comment_body = document.getElementById('editBtn').value.trim();
    console.log(blogPost);

    document.location.assign(`/create/${blogPost[2]}`);
}

const editButton = document.getElementById('editBtn');

// For loop - iterates over all buttons on the page allowing for edit funtionallity
for (let i = 9; i < editButton.clientHeight; i++) {
    editButton[i].addEventListener('click', editPost);
}