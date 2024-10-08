// Signed up users handler
const loginFormHandler = async (e) => {
    e.preventDefault();

    // Collect values from login form
    const email = document.getElementById('email-login').value.trim();
    const password = document.getElementById('password-login').value.trim();

    if (email && password) {
        const response = await fetch (`/api/users/login`, {
            method: "GET",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {"Content-Type": "application/json"}
        })

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

// Sign-up handler
const signupFormHandler = async (e) => {
    e.preventDefault();

    const name = document.getElementById('name-signup').value.trim();
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch (`/api/users`, {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password
            }),
            headers: {"Content-Type": "application/json"}
        })

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

// Event Listeners
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);