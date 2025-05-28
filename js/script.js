// Ativa o menu hamburguer ao clicar no botão em telas pequenas
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
  localStorage.setItem("themeColor", color); 


  let fontLink = document.querySelector("link[href*='fonts.googleapis']");
  if (fontLink) fontLink.remove();

  const newFontLink = document.createElement("link");
  newFontLink.rel = "stylesheet";

  if (color === "#f9f9f9") {
    newFontLink.href = "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap";
    document.body.style.fontFamily = "'Open Sans', sans-serif";
    document.body.style.color = "#333";
  } else if (color === "#1e1e1e") {
    newFontLink.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap";
    document.body.style.fontFamily = "'Montserrat', sans-serif";
    document.body.style.color = "#f1f1f1";
  } else if (color === "#e0f7fa") {
    newFontLink.href = "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap";
    document.body.style.fontFamily = "'Quicksand', sans-serif";
    document.body.style.color = "#222";
  }

  document.head.appendChild(newFontLink);
}

// Quiz 
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
  },
  {
    pergunta: "Qual órgão brasileiro monitora riscos de desastres naturais?",
    opcoes: ["IBGE", "CEMADEN", "INMET"],
    correta: 1
  },
  {
    pergunta: "Sensores de nível de água podem ajudar a:",
    opcoes: ["Medir a poluição do ar", "Prever deslizamentos", "Detectar enchentes iminentes"],
    correta: 2
  },
  {
    pergunta: "Qual tecnologia permite prever enchentes com até 48h de antecedência?",
    opcoes: ["Radar meteorológico", "Inteligência Artificial", "Wi-Fi público"],
    correta: 1
  },
  {
    pergunta: "O uso de imagens de satélite é essencial para:",
    opcoes: ["Mapear áreas de risco", "Aumentar a velocidade da internet", "Transmitir rádio FM"],
    correta: 0
  },
  {
    pergunta: "O aplicativo Alerta Rio serve para:",
    opcoes: ["Mostrar eventos culturais", "Emitir alertas de emergência", "Vender passagens de ônibus"],
    correta: 1
  },
  {
    pergunta: "Big Data pode ajudar em situações de enchente ao:",
    opcoes: ["Prever o humor das pessoas", "Mapear padrões de mobilidade", "Aumentar preços de aplicativos"],
    correta: 1
  },
  {
    pergunta: "O que significa um sistema de evacuação dinâmico?",
    opcoes: ["Com rota fixa", "Com rotas ajustáveis em tempo real", "Com rotas invisíveis"],
    correta: 1
  },
  {
    pergunta: "Modelagem BIM e GIS serve para:",
    opcoes: ["Criar redes sociais", "Planejar cidades resilientes", "Enviar mensagens automáticas"],
    correta: 1
  }
];


let currentQuestion = 0;
let score = 0;

document.getElementById("start-quiz").addEventListener("click", startQuiz);

function startQuiz() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";
  document.getElementById("start-quiz").style.display = "none";
  showQuestion();
}
// Exibe a pergunta atual e opções de resposta
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

// Mostra o resultado final e botão para reiniciar
function showResult() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = `<p>Você acertou ${score} de ${quizData.length} perguntas.</p>`;

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Reiniciar teste";
  restartBtn.onclick = () => {
    score = 0;
    currentQuestion = 0;
    startQuiz();
  };

  container.appendChild(restartBtn);
}

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
  slides.forEach(slide => (slide.style.display = "none"));
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000); 
}

// Validação de formulário de contato
const form = document.getElementById("contato-form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const feedback = document.getElementById("form-feedback");

    if (!nome || !email || !mensagem) {
      feedback.textContent = "Por favor, preencha todos os campos.";
      feedback.style.color = "red";
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      feedback.textContent = "E-mail inválido.";
      feedback.style.color = "red";
      return;
    }

    feedback.textContent = "Mensagem enviada com sucesso!";
    feedback.style.color = "green";
    this.reset();
  });
}


window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("themeColor");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme("#f9f9f9");
  }
  showSlides(); 
});
