let user = auth.currentUser;
const questionsContainer = document.getElementById('questions');
const progress = document.getElementById('progress');
const submitBtn = document.getElementById('submitBtn');
const backBtn = document.getElementById('backBtn');

const questionData = [
    { question: "Apa hukum Ohm?", options: ["I = V/R", "V = IR", "R = V/I"], correctAnswer: "V = IR" },
    { question: "Jika R = 10 ohm, V = 20V, berapa nilai I?", options: ["2 A", "1 A", "3 A"], correctAnswer: "2 A" },
    // Add more questions...
];

let userAnswers = [];
let currentQuestion = 0;

function displayQuestion(index) {
    const q = questionData[index];
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `
        <p>${q.question}</p>
        ${q.options.map((opt, idx) => `
            <input type="radio" name="q${index}" value="${opt}"> ${opt}<br>
        `).join('')}
    `;
    questionsContainer.appendChild(questionElement);
}

function handleProgress() {
    const progressValue = (currentQuestion / questionData.length) * 100;
    progress.value = progressValue;
}

submitBtn.addEventListener('click', () => {
    // Collect answers and store in Firebase Firestore
    const answers = [];
    const allAnswers = document.querySelectorAll('input[type="radio"]:checked');
    allAnswers.forEach(answer => {
        answers.push(answer.value);
    });
    
    db.collection('questions').add({
        email: user.email,
        answers: answers,
        submit: true
    }).then(() => {
        alert("Jawaban disubmit!");
    });
});

backBtn.addEventListener('click', () => {
    window.location.href = 'home.html';
});

questionData.forEach((_, index) => displayQuestion(index));
handleProgress();
