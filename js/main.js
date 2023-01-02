const questionsObject = document.querySelector('.question');
const btnPlay = document.querySelector('.btn-start');
const answersObjects = document.querySelectorAll('.answer');
let currentQuestionIndex = 0;
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

function setQuestion() {
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
	currentQuestionIndex++;
}

console.log(questionsStock.le);
btnPlay.addEventListener('click', setQuestion);
