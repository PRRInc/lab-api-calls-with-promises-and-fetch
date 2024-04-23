const BASE_URL = "https://opentdb.com/api.php?amount=10";
const main = document.querySelector(".centered")

const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    getTriviaQuestion(e);
})

function getTriviaQuestion(e) {
    e.preventDefault();

    fetch(BASE_URL)
    .then((response) => response.json())
    .then(({results}) => {
     results.map(result => {
            main.innerHTML += `<article class="card">
            <h2>${result.category}</h2>
            <p>${result.question}</p>
            <button onclick="showAnswer(event)" >Show Answer</button>
            <p class="hidden">${result.correct_answer}</p>
            </article>`
        })
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
      });
}

function showAnswer (event) {
    event.target.nextElementSibling.classList.toggle("hidden");
}
