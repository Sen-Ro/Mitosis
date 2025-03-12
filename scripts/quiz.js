const question = document.querySelector(".question");
const questionNum = document.querySelector(".questionNum");
const answers = document.querySelector(".answers");
const nextQuestion = document.querySelector(".next");
const prevQuestion = document.querySelector(".prev");

const quiz = [
    {
      question: "What is the correct order of the phases of mitosis?",
      answers: [
        { answer: "Metaphase → Anaphase → Telophase → Prophase", correct: false },
        { answer: "Prophase → Metaphase → Anaphase → Telophase", correct: true },
        { answer: "Anaphase → Metaphase → Prophase → Telophase", correct: false },
        { answer: "Telophase → Prophase → Anaphase → Metaphase", correct: false }
      ]
    },
    {
      question: "What structure helps pull the sister chromatids apart during mitosis?",
      answers: [
        { answer: "Ribosomes", correct: false },
        { answer: "Golgi apparatus", correct: false },
        { answer: "Spindle fibers", correct: true },
        { answer: "Lysosomes", correct: false }
      ]
    },
    {
      question: "During which phase do chromosomes line up in the center of the cell?",
      answers: [
        { answer: "Prophase", correct: false },
        { answer: "Metaphase", correct: true },
        { answer: "Anaphase", correct: false },
        { answer: "Telophase", correct: false }
      ]
    },
    {
      question: "What happens during anaphase?",
      answers: [
        { answer: "Chromosomes condense", correct: false },
        { answer: "The nuclear envelope disappears", correct: false },
        { answer: "Sister chromatids separate and move to opposite poles", correct: true },
        { answer: "The cytoplasm splits", correct: false }
      ]
    },
    {
      question: "Which phase of mitosis is the reverse of prophase?",
      answers: [
        { answer: "Metaphase", correct: false },
        { answer: "Anaphase", correct: false },
        { answer: "Telophase", correct: true },
        { answer: "Cytokinesis", correct: false }
      ]
    },
    {
      question: "What is the purpose of mitosis?",
      answers: [
        { answer: "To produce genetically identical daughter cells", correct: true },
        { answer: "To create sex cells for reproduction", correct: false },
        { answer: "To break down damaged cells", correct: false },
        { answer: "To create energy for the cell", correct: false }
      ]
    },
    {
      question: "What structure disappears during prophase?",
      answers: [
        { answer: "Mitochondria", correct: false },
        { answer: "Cell membrane", correct: false },
        { answer: "Golgi apparatus", correct: false },
        { answer: "Nuclear envelope", correct: true }
      ]
    },
    {
      question: "Which phase of mitosis ensures that each new cell gets the same number of chromosomes?",
      answers: [
        { answer: "Prophase", correct: false },
        { answer: "Metaphase", correct: false },
        { answer: "Anaphase", correct: true },
        { answer: "Telophase", correct: false }
      ]
    },
    {
      question: "How does cytokinesis differ in plant and animal cells?",
      answers: [
        { answer: "Animal cells form a cleavage furrow, while plant cells form a cell plate", correct: true },
        { answer: "Both form a cleavage furrow", correct: false },
        { answer: "Both form a cell plate", correct: false },
        { answer: "Neither undergo cytokinesis", correct: false }
      ]
    },
    {
      question: "After mitosis and cytokinesis, how many daughter cells are produced?",
      answers: [
        { answer: "1", correct: false },
        { answer: "2", correct: true },
        { answer: "4", correct: false },
        { answer: "8", correct: false }
      ]
    }
];

let selectedAnswers = [];

let curQuestion = 0;

init();

function init() {
    for (let question of quiz) {
        selectedAnswers.push(0);
    }
    loadQuestion(curQuestion);
}
  
function loadQuestion(questionIndex) {
    if (questionIndex == quiz.length) {
        finishQuiz();
        return;
    }
    question.textContent = quiz[questionIndex].question;
    questionNum.textContent = "Question #" + (questionIndex + 1);
    if (questionIndex == 0) prevQuestion.classList.add("hidden");
    else prevQuestion.classList.remove("hidden");
    if (questionIndex == quiz.length - 1) nextQuestion.textContent = "Finish";
    else nextQuestion.textContent = "Next Question"

    answers.innerHTML = "";

    quiz[questionIndex].answers.forEach((answer, index) => {
        const answerElem = document.createElement("div");
        answerElem.textContent = answer.answer;
        answerElem.classList.add("answer");

        if (selectedAnswers[questionIndex] == index + 1) answerElem.classList.add("selected");

        answerElem.addEventListener("click", () => {
            selectedAnswers[questionIndex] = index + 1;
            loadQuestion(questionIndex);
        })

        answers.append(answerElem);
    })
}

nextQuestion.addEventListener("click", () => {
    curQuestion++;
    loadQuestion(curQuestion);
})

prevQuestion.addEventListener("click", () => {
    curQuestion--;
    loadQuestion(curQuestion);
})

function finishQuiz() {
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
        if (answer !== 0) {
            if (quiz[index].answers[answer - 1].correct) score++;
        }
    })

    questionNum.textContent = "Quiz Finished!"
    question.textContent = "Your score was " + score + " out of " + quiz.length;

    answers.innerHTML = "Congratiolations! Now you know a little bit more about mitosis";
    answers.classList.remove("answers");
    answers.classList.add("finalMessage");

    nextQuestion.textContent = "Back to home";

    nextQuestion.addEventListener("click", e => {
      e.preventDefault();
      window.location = "/"
    })
} 