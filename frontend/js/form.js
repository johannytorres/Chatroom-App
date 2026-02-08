const tabs = document.querySelectorAll(".tab");
const form = document.querySelector("form");
const usernameInput = document.getElementById("username-input");

let selectedColor = null;

/* seleccionar color */

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("selected"));

        tab.classList.add("selected");

        selectedColor = tab.id.replace("tab-", ""); 
        console.log("color elegido:", selectedColor);
    });
});

/* submit */

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();

    if (!username) {
        alert("Write a username");
        return;
    }

    if (!selectedColor) {
        alert("Choose a color");
        return;
    }

    localStorage.setItem("chat_username", username);
    localStorage.setItem("chat_color", selectedColor);

    window.location.href = "../html/chat-room.html";
});
