const gameWindow = document.querySelector('.game-window');
const questionsArray = document.querySelector('.question');
const awardsArray = document.querySelectorAll('.stage');
const answersArray = document.querySelectorAll('.answer');
const popUpWindow = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.info-message');
const popUpAward = document.querySelector('.info-award');
const popUpGuarantedMoney = document.querySelector('.info-guaranted-award');

const btnConfirmAnswer = document.querySelector('.btn-confirm');
const btnExitGame = document.querySelector('.btn-exit');
const popUpButton = document.querySelector('.btn-pop-up');

let currentQuestionIndex = 0;
let guarantedMoney = '0';
let correctAnswer;

const questionsStock = [
	{
		question:
			'Gdy Neil Armstron stanął na Księżycu, wypowiedział słynne zdanie. Co na Srebrnym Globie zrobił Alan Shepard?',
		answers: [
			{ text: 'Zagrał w golfa', correct: true },
			{ text: 'Biegał z siatką na motyle', correct: false },
			{ text: 'Zatańczył rock and rolla', correct: false },
			{ text: 'Godzinę leżał krzyżem', correct: false },
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
		question:
			'Co mieści Wielki Łuk Braterstwa w paryskiej dzielnicy La Defense, zwany dwudziestowieczną wersją Łuku Triumfalnego?',
		answers: [
			{
				text: 'Szczątki Napoleona I',
				correct: false,
			},
			{
				text: 'Nic',
				correct: false,
			},
			{
				text: 'Ziemię z pól bitewnych',
				correct: false,
			},
			{
				text: 'Biura ministerstwa ekologii',
				correct: true,
			},
		],
	},
	{
		question: 'Kto jest twórcą logo zespołu Perfect?',
		answers: [
			{
				text: 'Andrzej Mleczko',
				correct: false,
			},
			{
				text: 'Henryk Sawka',
				correct: false,
			},
			{
				text: 'Marek Raczkowski',
				correct: false,
			},
			{
				text: 'Edward Lutczyn',
				correct: true,
			},
		],
	},
	{
		question: 'Na co reaguje nocyceptor?',
		answers: [
			{
				text: 'Na mroki nocy',
				correct: false,
			},
			{
				text: 'Na słodki smak',
				correct: false,
			},
			{
				text: 'Na podczerwień małej mocy',
				correct: false,
			},
			{
				text: 'Na bodźce uszkadzające tkanki',
				correct: true,
			},
		],
	},
	{
		question: 'Z czego odlane są złote medale olimpijskie?',
		answers: [
			{
				text: 'Ze złota',
				correct: false,
			},
			{
				text: 'Z brązu',
				correct: false,
			},
			{
				text: 'Z żeliwa',
				correct: false,
			},
			{
				text: 'Ze srebra',
				correct: true,
			},
		],
	},
	{
		question:
			'W 1971 r. psycholog Philip Zimbardo przeprowadził eksperyment symulujący:',
		answers: [
			{
				text: 'życie rozbitków na wyspie',
				correct: false,
			},
			{
				text: 'przebywanie w kosmosie',
				correct: false,
			},
			{
				text: 'życie w więzieniu',
				correct: true,
			},
			{
				text: 'odbijanie zakładników',
				correct: false,
			},
		],
	},
	{
		question:
			'XVII-wieczna seria konfliktów między Ligą Katolicką a Unią Protestancką trwała:',
		answers: [
			{
				text: '10 lat',
				correct: false,
			},
			{
				text: '30 lat',
				correct: true,
			},
			{
				text: '50 lat',
				correct: false,
			},
			{
				text: '100 lat',
				correct: false,
			},
		],
	},
	{
		question: 'Jak nazywa się poprzednik systemu Windows?',
		answers: [
			{
				text: 'Linux',
				correct: false,
			},
			{
				text: 'OS X',
				correct: false,
			},
			{
				text: 'MS-DOS',
				correct: true,
			},
			{
				text: 'DOS',
				correct: false,
			},
		],
	},
	{
		question: 'Jak nazywa się pustynia w Chile?',
		answers: [
			{
				text: 'Atakama',
				correct: true,
			},
			{
				text: 'Kalahari',
				correct: false,
			},
			{
				text: 'Sahara',
				correct: false,
			},
			{
				text: 'Pustynia Wiktorii',
				correct: false,
			},
		],
	},
	{
		question: 'Jak nazywa się waluta używana w Laosie?',
		answers: [
			{
				text: 'kip',
				correct: true,
			},
			{
				text: 'bat',
				correct: false,
			},
			{
				text: 'lir',
				correct: false,
			},
			{
				text: 'dồng',
				correct: false,
			},
		],
	},
	{
		question: 'Gdzie znajduje się Lubumbashi?',
		answers: [
			{
				text: 'w Etiopii',
				correct: false,
			},
			{
				text: 'w Demokratycznej Republice Konga',
				correct: true,
			},
			{
				text: 'w Senegalu',
				correct: false,
			},
			{
				text: 'w Tunezji',
				correct: false,
			},
		],
	},
];

if (popUpWindow.classList.contains('fresh-game')) {
	gameWindow.style.display = 'none';
	popUpWindow.style.display = 'flex';
	popUpButton.innerText = 'Nowa Gra';
	popUpButton.addEventListener('click', () => {
		classTogler();
		startNewGame();
	});
}


function classTogler() {
	popUpWindow.classList.toggle('fresh-game');
	gameWindow.style.display = null;
	popUpWindow.style.display = null;
}

function startNewGame() {
	if (currentQuestionIndex <= 0) {
		questionsStock.sort(function () {
			return Math.random() - 0.5;
		});
		questionsArray.innerText = questionsStock[currentQuestionIndex].question;
		answersArray.forEach((element) => {
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

function goToNextQuestion() {
	closepopUpWindow();
	currentQuestionIndex++;
	questionsArray.innerText = questionsStock[currentQuestionIndex].question;
	answersArray.forEach((element) => {
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
	answersArray.forEach((element) => {
		if (element.classList.contains('selected')) {
			choosenOne = element;
		}
	});

	if (choosenOne.innerText == correctAnswer && currentQuestionIndex !== 11) {
		if (
			awardsArray[currentQuestionIndex].classList.contains('stageGuaranted')
		) {
			guarantedMoney = awardsArray[currentQuestionIndex].innerHTML;
		}
		loadPopUpWindow();
		popUpMessage.innerText = 'Odpowiedź jest poprawna';
		popUpAward.innerText = `Wygrałeś: ${awardsArray[currentQuestionIndex].innerText}!`;
		popUpGuarantedMoney.innerText = `Twoja ocecna gwarantowana wygrana to: ${guarantedMoney}`;
		popUpButton.innerText = 'OK';
		popUpButton.addEventListener('click', goToNextQuestion);

		answersArray.forEach((element) => element.classList.remove('selected'));
		answersArray.forEach((element) => (element.style.backgroundColor = null));
	} else if (
		choosenOne.innerText == correctAnswer &&
		currentQuestionIndex == 11
	) {
		loadPopUpWindow();
		popUpMessage.innerText = 'Odpowiedź jest poprawna';
		popUpAward.innerText = 'Zostałeś milionerem';
		popUpGuarantedMoney.style.display = 'none';
		popUpButton.innerText = 'Zagraj Ponownie';
		popUpButton.addEventListener('click', reloadGame);
	} else {
		loadPopUpWindow();
		popUpButton.innerText = 'Zagraj ponownie!';
		popUpMessage.innerText = 'Przegraleś!';
		popUpAward.style.display = 'none';
		popUpGuarantedMoney.innerText = `Twoja dzisiejsza wygrana to: ${guarantedMoney}`;
		popUpButton.addEventListener('click', reloadGame);
	}
}

function reloadGame() {
	window.location.reload();
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
	if (checkIfSelected(answersArray) == true) {
		let selectedA = event.target;
		selectedA.style.backgroundColor = '#7f5af0';
		selectedA.classList.add('selected');
	} else {
		answersArray.forEach((element) => element.classList.remove('selected'));
		answersArray.forEach((element) => (element.style.backgroundColor = null));
		let selectedB = event.target;
		selectedB.style.backgroundColor = '#7f5af0';
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
	if (currentQuestionIndex == 0) {
		awardsArray[currentQuestionIndex].style.backgroundColor = '#7f5af0';
	}
	if (currentQuestionIndex > 0) {
		for (
			let index = currentQuestionIndex;
			index <= currentQuestionIndex;
			index++
		) {
			awardsArray[index - 1].style.backgroundColor = '#242629';
			awardsArray[index].style.backgroundColor = '#7f5af0';
		}
	}
}

function exitGame() {
	loadPopUpWindow();
	popUpButton.innerText = 'Zagraj ponownie!';
	popUpMessage.style.display = 'none';
	popUpAward.innerText = `Graylacje! Wygrałeś w dniu dzisiejszym: ${
		awardsArray[currentQuestionIndex - 1].innerText
	}!`;
	popUpGuarantedMoney.style.display = 'none';
	popUpButton.addEventListener('click', reloadGame);
}

function loadPopUpWindow() {
	popUpWindow.style.display = 'flex';
}

function closepopUpWindow() {
	popUpWindow.style.display = 'none';
}

answersArray.forEach((element) =>
	element.addEventListener('click', selectAnswer)
);

btnConfirmAnswer.addEventListener('click', checkSelectedAnswer);
btnExitGame.addEventListener('click', exitGame);
