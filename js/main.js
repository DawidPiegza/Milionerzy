const questionsObject = document.querySelector('.question');
const btnPlay = document.querySelector('.btn-start');
const answersObjects = document.querySelectorAll('.answer');
const btnConfirmAnswer = document.querySelector('.btn-confirm');
let currentQuestionIndex = 0;
let correctAnswer;
const questionsStock = [
	{
		question: 'Kto był pierwszym królem polski?',
		answers: [
			{ text: 'Mieszko I', correct: false },
			{ text: 'Bolesław Chrobry', correct: true },
			{ text: 'Kazmierz Wielki', correct: false },
			{ text: 'Władysław IV', correct: false },
		],
	},
	{
		question: 'Ile warstw wyróżniamy w przypadku modelu TCP/IP?',
		answers: [
			{ text: '6', correct: false },
			{ text: '3', correct: false },
			{ text: '4', correct: true },
			{ text: '5', correct: false },
		],
	},
	{
		question: 'Co oznacza akronim VLAN?',
		answers: [
			{
				text: 'Jest to skrót oznaczający wirtualną sieć lokalną',
				correct: false,
			},
			{
				text: 'Jest to skrót oznaczający graficzne przedstawienie infrastruktury sieci',
				correct: true,
			},
			{
				text: 'Jest to skrót oznaczający połączenie między adresem wewnętrznym a adresem publicznym',
				correct: false,
			},
			{
				text: 'Jest to skrót oznaczający zasięg sieci wirtualnej',
				correct: false,
			},
		],
	},
];

function startGame() {
	if (currentQuestionIndex <= 0) {
		questionsObject.innerText = questionsStock[currentQuestionIndex].question;
		answersObjects.forEach((element) => {
			if (element.classList.contains('answerA')) {
				element.innerText =
					questionsStock[currentQuestionIndex].answers[0].text;
			} else if (element.classList.contains('answerB')) {
				element.innerText =
					questionsStock[currentQuestionIndex].answers[1].text;
			} else if (element.classList.contains('answerC')) {
				element.innerText =
					questionsStock[currentQuestionIndex].answers[2].text;
			} else if (element.classList.contains('answerD')) {
				element.innerText =
					questionsStock[currentQuestionIndex].answers[3].text;
			}
		});
	}
	findRightAnswer();
}

function nextQuestion() {
	currentQuestionIndex++;
	questionsObject.innerText = questionsStock[currentQuestionIndex].question;
	answersObjects.forEach((element) => {
		if (element.classList.contains('answerA')) {
			element.innerText = questionsStock[currentQuestionIndex].answers[0].text;
		} else if (element.classList.contains('answerB')) {
			element.innerText = questionsStock[currentQuestionIndex].answers[1].text;
		} else if (element.classList.contains('answerC')) {
			element.innerText = questionsStock[currentQuestionIndex].answers[2].text;
		} else if (element.classList.contains('answerD')) {
			element.innerText = questionsStock[currentQuestionIndex].answers[3].text;
		}
	});
	findRightAnswer();
}

function checkSelectedAnswer() {
	let choosenOne;
	answersObjects.forEach((element) => {
		if (element.classList.contains('selected')) {
			choosenOne = element;
		}
	});
	if (choosenOne.innerText == correctAnswer) {
		alert('Wygrałeś!');
		nextQuestion();
	} else {
		alert('Przegrałeś!');
	}
}

function checkIfSelected(element) {
	let counter = 0;
	element.forEach((elem) => {
		if (elem.classList.contains('selected')) {
			counter++;
		}
	});
	if (counter <= 0) {
		return true;
	} else {
		return false;
	}
}

function selectAnswer(event) {
	if (checkIfSelected(answersObjects) == true) {
		let selectedA = event.target;
		selectedA.style.border = '10px solid #7f5af0';
		selectedA.classList.add('selected');
	} else alert('coś wybrano');
}

function findRightAnswer() {
	questionsStock[currentQuestionIndex].answers.forEach((element) => {
		if (element.correct == true) {
			correctAnswer = element.text;
		}
	});
}

btnPlay.addEventListener('click', startGame);
answersObjects.forEach((element) =>
	element.addEventListener('click', selectAnswer)
);

btnConfirmAnswer.addEventListener('click', checkSelectedAnswer);
