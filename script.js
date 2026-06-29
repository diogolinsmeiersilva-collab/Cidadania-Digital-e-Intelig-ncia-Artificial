// Dados do Jogo - Pares Temáticos Visuais (Imagens Reais e Textos Educativos)
const cardData = [
    { id: 1, type: "fato", img: "https://unsplash.com", text: "FATO: Deepfakes usam Redes Generativas Adversariais (GANs)" },
    { id: 1, type: "fato", img: "https://unsplash.com", text: "FATO: Deepfakes usam Redes Generativas Adversariais (GANs)" },
    { id: 2, type: "fake", img: "https://unsplash.com", text: "FAKE: Vídeos de IA possuem sincronia labial 100% perfeita" },
    { id: 2, type: "fake", img: "https://unsplash.com", text: "FAKE: Vídeos de IA possuem sincronia labial 100% perfeita" },
    { id: 3, type: "fato", img: "https://unsplash.com", text: "FATO: O cansaço ocular ou piscar lento revela vídeos falsos" },
    { id: 3, type: "fato", img: "https://unsplash.com", text: "FATO: O cansaço ocular ou piscar lento revela vídeos falsos" },
    { id: 4, type: "fake", img: "https://unsplash.com", text: "FAKE: Ferramentas automatizadas barram 100% dos fakes" },
    { id: 4, type: "fake", img: "https://unsplash.com", text: "FAKE: Ferramentas automatizadas barram 100% dos fakes" }
];

// Seletores do DOM
const gameGrid = document.getElementById("game-grid");
const attemptsCounter = document.getElementById("attempts-counter");
const resetBtn = document.getElementById("reset-game-btn");
const toggleDarkModeBtn = document.getElementById("toggle-dark-mode");
const feedbackForm = document.getElementById("feedback-form");
const formMessage = document.getElementById("form-message");

// Estado da Aplicação
let flippedCards = [];
let matchedPairsCount = 0;
let totalAttempts = 0;
let isProcessing = false;

// 1. Funcionalidade: Modo Escuro (Acessibilidade)
toggleDarkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// 2. Lógica do Jogo: Embaralhar Cartas
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Inicializar ou Reiniciar Tabuleiro
function initGame() {
    gameGrid.innerHTML = "";
    flippedCards = [];
    matchedPairsCount = 0;
    totalAttempts = 0;
    isProcessing = false;
    attemptsCounter.textContent = totalAttempts;

    const shuffledCards = shuffle([...cardData]);

    shuffledCards.forEach(item => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("memory-card");
        cardElement.dataset.id = item.id;

        // Estrutura com Frente (?) e Verso (Imagem + Texto Informativo)
        cardElement.innerHTML = `
            <div class="card-front-side">?</div>
            <div class="card-back-side type-${item.type}">
                <img src="${item.img}" alt="Ilustração sobre IA">
                <p>${item.text}</p>
            </div>
        `;

        cardElement.addEventListener("click", handleCardClick);
        gameGrid.appendChild(cardElement);
    });
}

// Gerenciar Cliques nas Cartas
function handleCardClick(event) {
    const clickedCard = event.currentTarget;

    // Evita cliques inválidos ou cartas já viradas/combinadas
    if (isProcessing || clickedCard.classList.contains("flipped") || clickedCard.classList.contains("matched")) {
        return;
    }

    clickedCard.classList.add("flipped");
    flippedCards.push(clickedCard);

    // Se duas cartas foram viradas, checa o par
    if (flippedCards.length === 2) {
        totalAttempts++;
        attemptsCounter.textContent = totalAttempts;
        checkMatch();
    }
}

// Validar se as duas cartas abertas formam um par
function checkMatch() {
    isProcessing = true;
    const [cardOne, cardTwo] = flippedCards;

    if (cardOne.dataset.id === cardTwo.dataset.id) {
        // Sucesso: mantém abertas e adiciona classe de acerto
        cardOne.classList.remove("flipped");
        cardTwo.classList.remove("flipped");
        cardOne.classList.add("matched");
        cardTwo.classList.add("matched");
        
        matchedPairsCount++;
        flippedCards = [];
        isProcessing = false;

        // Verifica vitória
        if (matchedPairsCount === cardData.length / 2) {
            setTimeout(() => {
                alert(`Parabéns! Você aprendeu a combater a desinformação em ${totalAttempts} tentativas.`);
            }, 400);
        }
    } else {
        // Erro: desvira após 1.5 segundos para dar tempo de ler o texto informativo
        setTimeout(() => {
            cardOne.classList.remove("flipped");
            cardTwo.classList.remove("flipped");
            flippedCards = [];
            isProcessing = false;
        }, 1500);
    }
}

// Ouvinte do Botão Reset
resetBtn.addEventListener("click", initGame);

// 3. Funcionalidade: Validação Dinâmica do Formulário sem recarregar a página
feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = document.getElementById("user-name").value;
    
    formMessage.textContent = `Obrigado, ${userName}! Seus dados ajudam a mapear a percepção sobre Deepfakes na nossa comunidade.`;
    formMessage.classList.remove("hidden");
    feedbackForm.reset();
});

// Executa ao carregar a página
initGame();
