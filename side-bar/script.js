const sideBar = document.getElementById("side-bar");
const toggleBtn = document.getElementById("toggle-button");

toggleBtn.addEventListener("click", (event) => {
    sideBar.classList.toggle("active");
    toggleBtn.classList.toggle("fa-bars");
    toggleBtn.classList.toggle("fa-xmark");
})