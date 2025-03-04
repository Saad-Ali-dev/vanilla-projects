// Accessing dom elements
const text = document.querySelectorAll("p");
const image = document.querySelector("#person-img");
const leftArrow = document.querySelector("#left-arrow");
const rightArrow = document.querySelector("#right-arrow");
const button = document.querySelector("button");

let index = 0;

// Creating data ( array of objects )
const person = [
    {
        imgUrl: "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
        name: "Jason Smith",
        job: "WEB DEVELOPER",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        imgUrl: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
        name: "Harry Potter",
        job: "AI Engineer",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed",
    },
    {
        imgUrl: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
        name: "Mark Gates",
        job: "Software Engineer",
        description: "Remaining essentially unchanged. It was popularised in the 2005 with the release many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    }
];

function displayPerson(index){
    image.src = person[index].imgUrl;
    text[0].innerText = person[index].name;
    text[1].innerText = person[index].job;
    text[2].innerText = person[index].description;
}

// Adding event listeners

button.addEventListener("click", () => {
    index = Math.floor(Math.random() * person.length)
    displayPerson(index);
})

leftArrow.addEventListener("click", () => {
    index = index === 0 ? person.length - 1 : index - 1;
    displayPerson(index);
})

rightArrow.addEventListener("click", () => {
    index = index === 2 ? 0 : ++index;
    displayPerson(index);
})