//Simple Counter program in JavaScript

// accessing dom elements
const decrease = document.querySelector("#decrement");
const reset = document.querySelector("#reset");
const increase = document.querySelector("#increment");
const counter = document.querySelector("h1");

// adding variables
let count = 0;

//decrease event listener
decrease.addEventListener("click", (e) => {
    count--;
    counter.innerText = `${count}`;
})

//increase event listener
increase.addEventListener("click", (e) => {
    count++;
    counter.innerText = `${count}`;
})

//reset
reset.addEventListener("click", (e) => {
    count = 0;
    counter.innerText = `${count}`;
})