const CATEGORY_URL = "https://opentdb.com/api_category.php";

fetch(CATEGORY_URL)
  .then((response) => response.json())
  .then(({ trivia_categories }) => {
    const categorySelect = document.getElementById("category");
    trivia_categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error fetching category list:", error);
  });

const BASE_URL = "https://opentdb.com/api.php?amount=10";
const main = document.querySelector(".centered")

const form = document.getElementById("quiz-form");

form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    getTriviaQuestion(e);
})

function getTriviaQuestion(e) {
    const selectedCategory = document.getElementById("category").value;
    let url = BASE_URL;
    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
    }

    fetch(url)
    .then((response) => response.json())
    .then(({results}) => {
        main.innerHTML = ""; 
        results.map(result => {
            let cardClass = "";
            if (result.difficulty === "easy") {
            cardClass = "easy";
        } else if (result.difficulty === "medium") {
            cardClass = "medium";
        } else if (result.difficulty === "hard") {
            cardClass = "hard";
        } else {
            cardClass = "";
        }
        const answers = [...result.incorrect_answers, result.correct_answer];
        const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

        const article = document.createElement("article");
        article.classList.add("card", cardClass);
        article.innerHTML = `
          <h2>${result.category}</h2>
          <h3>${result.difficulty}</h3>
          <p>${result.question}</p>
          <form>
            ${shuffledAnswers.map(answer => `
              <label>
                <input type="radio" name="answer" value="${answer}">
                ${answer}
              </label>
            `).join("")}
            <button type="button" onclick="showAnswer(event, '${result.correct_answer}')">Show Answer</button>
            <p class="hidden correct-answer">${result.correct_answer}</p>
          </form>
        `;
        main.appendChild(article);
    });
})
.catch((error) => {
    console.error("Error fetching data:", error);
});
}

function showAnswer(event, correctAnswer) {
    const form = event.target.closest("form");
    const selectedAnswer = form.querySelector("input[name='answer']:checked");
    if (selectedAnswer) {
        const userAnswer = selectedAnswer.value;
        const answers = form.querySelectorAll("input[name='answer']");
        answers.forEach(answer => {
            if (answer.value === correctAnswer) {
                answer.parentElement.classList.add("correct");
            } else if (answer.value === userAnswer) {
                answer.parentElement.classList.add("wrong");
            }
            answer.disabled = true;
        });
    }
}
