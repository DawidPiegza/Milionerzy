const questionsObject = document.querySelector('.question');
const btnPlay = document.querySelector('.btn-start');
const answersObjects = document.querySelectorAll('.answer');
const btnConfirmAnswer = document.querySelector('.btn-confirm');
const awardsObjects = document.querySelectorAll('.stage');
const btnExitGame = document.querySelector('.btn-exit');
let guearantedMoney;
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
				correct: true,
			},
			{
				text: 'Jest to skrót oznaczający graficzne przedstawienie infrastruktury sieci',
				correct: false,
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
	markCurrentStage();
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
	markCurrentStage();
}

function checkSelectedAnswer() {
	let choosenOne;
	answersObjects.forEach((element) => {
		if (element.classList.contains('selected')) {
			choosenOne = element;
		}
	});
	if (choosenOne.innerText == correctAnswer) {
		alert(`Wygrałeś! ${awardsObjects[currentQuestionIndex].innerText} `);
		answersObjects.forEach((element) => element.classList.remove('selected'));
		answersObjects.forEach((element) => (element.style.border = null));
		if (currentQuestionIndex == 1 || currentQuestionIndex == 7) {
			guearantedMoney = awardsObjects[currentQuestionIndex].innerText;
			alert(`Gratulacje, masz gwarantowane ${guearantedMoney}`);
		}
		nextQuestion();
	} else {
		alert('Przegrałeś!');
		window.location.reload();
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
	} else {
		answersObjects.forEach((element) => element.classList.remove('selected'));
		answersObjects.forEach((element) => (element.style.border = null));
		let selectedB = event.target;
		selectedB.style.border = '10px solid #7f5af0';
		selectedB.classList.add('selected');
	}
}

function findRightAnswer() {
	questionsStock[currentQuestionIndex].answers.forEach((element) => {
		if (element.correct == true) {
			correctAnswer = element.text;
		}
	});
}

function markCurrentStage() {
	for (
		let index = currentQuestionIndex;
		index <= currentQuestionIndex;
		index++
	) {
		awardsObjects[index - 1].style.backgroundColor = 'grey';
		awardsObjects[index].style.backgroundColor = 'red';
	}
}

function dropGame() {
	alert(
		`Gratulacje! Wygrałeś dzisiaj ${
			awardsObjects[currentQuestionIndex - 1].innerText
		}`
	);
	window.location.reload();
}

btnPlay.addEventListener('click', startGame);
answersObjects.forEach((element) =>
	element.addEventListener('click', selectAnswer)
);

btnConfirmAnswer.addEventListener('click', checkSelectedAnswer);
btnExitGame.addEventListener('click', dropGame);
