const icons = document.querySelectorAll("i");

icons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
        icon.classList.toggle("active");
        const parentContainer = icon.closest(".question-box");
        parentContainer.classList.toggle("increase-height");
    })
})