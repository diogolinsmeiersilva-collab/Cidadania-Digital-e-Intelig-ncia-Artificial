const questions = [
    {
        question: "Um vídeo de uma figura pública fazendo uma declaração absurda surgiu nas redes, mas a boca dela parece não sincronizar perfeitamente com o áudio. O que isso pode indicar?",
        options: [
            "Um problema comum na conexão de internet de quem gravou.",
            "Uma manipulação por inteligência artificial (Deepfake).",
            "Que o vídeo foi gravado em câmera lenta."
        ],
        answer: 1
    },
    {
        question: "Como os robôs de IA (bots) facilitam a propagação de Fake News?",
        options: [
            "Eles corrigem os erros de português das notícias verdadeiras.",
            "Eles geram e compartilham textos falsos automaticamente em larga escala.",
            "Eles deletam posts suspeitos de redes sociais automaticamente."
        ],
        answer: 1
    },
    {
        question: "Qual é a conduta mais responsável da cidadania digital ao receber uma notícia alarmante?",
        options: [
            "Verificar em agências de checagem e portais confiáveis antes de repassar.",
            "Compartilhar nos grupos para ver se alguém sabe se é verdade.",
            "Postar imediatamente para garantir curtidas e alcance."
        ],
        answer: 0
    }
];

let currentIndex = 0;
let userScore = 0;
let optionSelected = false;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const progressIndicator = document.getElementById("progress-indicator");
const btnNext = document.getElementById("btn-next");
const questionBox = document.getElementById("question-box");
const resultBox = document.getElementById("result-box");
const resultText = document.getElementById("result-text");

function startQuiz() {
    currentIndex = 0;
    userScore = 0;
    questionBox.classList.remove("hidden");
    resultBox.classList.add("hidden");
    progressIndicator.classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    optionSelected = false;
    btnNext.classList.add("hidden");
    optionsContainer.innerHTML = "";
    
    const currentQuestion = questions[currentIndex];
    questionText.textContent = currentQuestion.question;
    progressIndicator.textContent = `Pergunta ${currentIndex + 1} de ${questions.length}`;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.addEventListener("click", () => evaluateAnswer(button, index));
        optionsContainer.appendChild(button);
    });
}

function evaluateAnswer(selectedButton, index) {
    if (optionSelected) return;
    optionSelected = true;

    const correctIndex = questions[currentIndex].answer;
    const allButtons = optionsContainer.children;

    if (index === correctIndex) {
        selectedButton.classList.add("correct");
        userScore++;
    } else {
        selectedButton.classList.add("wrong");
        allButtons[correctIndex].classList.add("correct");
    }

    for (let btn of allButtons) {
        btn.disabled = true;
    }

    btnNext.classList.remove("hidden");
}

function handleNextClick() {
    currentIndex++;
    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        displayResults();
    }
}

function displayResults() {
    questionBox.classList.add("hidden");
    progressIndicator.classList.add("hidden");
    btnNext.classList.add("hidden");
    resultBox.classList.remove("hidden");

    resultText.innerHTML = `Você acertou <strong>${userScore} de ${questions.length}</strong> questões.<br><br>`;
    if (userScore === questions.length) {
        resultText.innerHTML += "🏆 Excelente! Você possui um ótimo senso crítico digital.";
    } else {
        resultText.innerHTML += "📚 Bom esforço! Fique sempre atento aos detalhes na internet.";
    }
}

function restartQuiz() {
    startQuiz();
}

// Inicialização automática do Quiz
document.addEventListener("DOMContentLoaded", startQuiz);
