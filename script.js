// Banco de dados de perguntas do Quiz
const quizData = [
    {
        question: "Se você receber um vídeo chocante de um influenciador no grupo da escola, qual deve ser sua primeira atitude?",
        options: [
            "Compartilhar imediatamente para avisar os amigos.",
            "Ignorar e não falar com ninguém sobre isso.",
            "Verificar se portais de notícias confiáveis estão falando sobre o assunto antes de repassar."
        ],
        correct: 2
    },
    {
        question: "Qual dessas opções descreve melhor o que é uma 'Deepfake'?",
        options: [
            "Uma foto tirada de um ângulo ruim que distorce a realidade.",
            "Um vídeo ou áudio alterado de forma realista por Inteligência Artificial.",
            "Um vírus de computador que apaga arquivos do sistema."
        ],
        correct: 1
    },
    {
        question: "Ao analisar um vídeo suspeito de ser modificado por IA, qual falha visual é comum encontrar?",
        options: [
            "Movimentos de piscar de olhos não naturais ou borrões ao redor do rosto.",
            "O vídeo estar em preto e branco.",
            "Legendas escritas em outro idioma."
        ],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Elementos da interface dominados pelo JS
const questionElement = document.getElementById("question-text");
const optionsBox = document.getElementById("options-box");
const nextButton = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-box");

// Função para carregar a pergunta atual
function loadQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(button, index));
        optionsBox.appendChild(button);
    });
}

// Limpa o estado anterior das opções e botões
function resetState() {
    nextButton.style.display = "none";
    while (optionsBox.firstChild) {
        optionsBox.removeChild(optionsBox.firstChild);
    }
}

// Processa a escolha do usuário
function selectOption(selectedButton, index) {
    let correctIndex = quizData[currentQuestionIndex].correct;
    let allButtons = optionsBox.children;

    if (index === correctIndex) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        allButtons[correctIndex].classList.add("correct"); // Revela a alternativa correta
    }

    // Trava os botões para impedir cliques múltiplos
    for (let btn of allButtons) {
        btn.disabled = true;
    }

    nextButton.style.display = "block";
}

// Avança para a próxima pergunta ou finaliza o jogo
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Exibe o feedback final do desempenho no Quiz
function showResults() {
    resetState();
    questionElement.innerText = "Quiz Concluído!";
    scoreBox.innerText = `Você acertou ${score} de ${quizData.length} perguntas!`;
    
    if(score === quizData.length) {
        scoreBox.innerText += " 🎉 Parabéns! Você é um cidadão digital consciente!";
    } else {
        scoreBox.innerText += " 👍 Bom esforço! Continue atento ao navegar na rede.";
    }
}

// Inicializa o quiz assim que a página carrega
loadQuestion();
