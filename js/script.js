document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("menu").classList.toggle("active");
});


const themes = {
  claro: "#f9f9f9",
  escuro: "#1e1e1e",
  aqua: "#e0f7fa"
};

function setTheme(color) {
  document.documentElement.style.setProperty('--background-color', color);
}

const quizData = [
  {
    pergunta: "Qual é uma das causas mais comuns de enchentes urbanas?",
    opcoes: ["Falta de vegetação", "Presença de rios", "Poluição sonora"],
    correta: 0
  },
  {
    pergunta: "O que o termo IoT significa?",
    opcoes: ["Internet das Coisas", "Interface Online Técnica", "Infraestrutura de Ondas Terrestres"],
    correta: 0
  }
  
];

let currentQuestion = 0;
let score = 0;

document.getElementById("start-quiz").addEventListener("click", startQuiz);

function startQuiz() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";
  showQuestion();
}

function showQuestion() {
  const container = document.getElementById("quiz-container");
  const q = quizData[currentQuestion];
  const questionEl = document.createElement("h3");
  questionEl.textContent = q.pergunta;
  container.appendChild(questionEl);

  q.opcoes.forEach((opcao, i) => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.onclick = () => {
      if (i === q.correta) score++;
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        container.innerHTML = "";
        showQuestion();
      } else {
        showResult();
      }
    };
    container.appendChild(btn);
  });
}

function showResult() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = `<p>Você acertou ${score} de ${quizData.length} perguntas.</p>`;
}
