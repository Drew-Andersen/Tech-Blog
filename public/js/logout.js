// Logs the user out
const logout = async () => {
    const response = await fetch(`/api/users/logout`, {
        method: "POST",
        headers: {"Content-Type": "applictaion/json"}
    })

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

// Event Listener
document.getElementById('logout').addEventListener('click', logout);