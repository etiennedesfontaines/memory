let turnCount = 0;
let userCardSelection = [];
let userCardMatches = [];

const documentBody = document.querySelector("body");
const getCards = () => [
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/aardvark.png",
		id: 1,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/badger.png",
		id: 2,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/chiwawa.png",
		id: 3,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/duck.png",
		id: 4,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/fox.png",
		id: 5,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/frog.png",
		id: 6,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/highland-cow.png",
		id: 7,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/koala.png",
		id: 8,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/lama.png",
		id: 9,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/monster.png",
		id: 10,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/panda.png",
		id: 11,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/penguin.png",
		id: 12,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/rabbit.png",
		id: 13,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/reindeer.png",
		id: 14,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/scotty.png",
		id: 15,
	},
	{
		cardName: "aardvark",
		faceImage: "../illustrations/card-decks/patchwork-animals/teddy.png",
		id: 16,
	},
];

const selectCards = (cards, difficulty) => {
	switch (difficulty) {
		case "Easy":
			return [...cards.slice(8), ...cards.slice(8)];
			break;
		case "Medium":
			return [...cards.slice(0, 12), ...cards.slice(0, 12)];
			break;
		case "Hard":
			return [...cards, ...cards];
			break;
	}
};

//Talk through this shuffle function with Chim
const shuffleCards = (cards) => {
	cards.sort(() => Math.random() - 0.5);
	return cards;
};

const closeMenu = (menu) => {
	console.log("close menu function is fucked, please resolve");
};

const renderMenuOptions = (menu) => {
	const menuOptions = document.createElement("ul");
	const newGameOption = document.createElement("li");
	const howToPlayOption = document.createElement("li");
	const quiteGameOption = document.createElement("li");
	const closeMenuButton = document.createElement("btn");

	menuOptions.classList.add("memory-game__menu-options");
	newGameOption.classList.add("memory-game__menu-option");
	howToPlayOption.classList.add("memory-game__menu-option");
	quiteGameOption.classList.add("memory-game__menu-option");
	closeMenuButton.classList.add("memory-game__close-btn", "memory-game__close-btn--game-menu"); //prettier-ignore

	newGameOption.innerHTML = "New Game";
	howToPlayOption.innerHTML = "How to play?";
	quiteGameOption.innerHTML = "Quit";
	closeMenuButton.innerHTML = "x";

	menuOptions.append(newGameOption, howToPlayOption, quiteGameOption);
	menu.append(closeMenuButton, menuOptions);

	//functionality

	closeMenuButton.addEventListener("click", () => {
		closeMenu(menu);
	});

	newGameOption.addEventListener("click", () => {
		const newGameWarning = document.createElement("h3");
		const acceptButton = document.createElement("button");
		const declineButton = document.createElement("button");

		newGameWarning.innerHTML = "Are you sure You want to start a new game?";
		acceptButton.innerHTML = "Yes";
		declineButton.innerHTML = "No!";

		newGameWarning.classList.add("memory-game__warning");
		acceptButton.classList.add("memory-game__decision-btn");
		declineButton.classList.add("memory-decision-btn");

		menu.append(newGameWarning, acceptButton, declineButton);

		//Add functionality to accept and decline buttons (newGame and Quit)
	});

	howToPlayOption.addEventListener("click", () => {
		const howToPlayWindow = document.createElement("div");
		const closeWindowButton = document.createElement("button");
		const heading = document.createElement("h3");
		const description = document.createElement("p");

		heading.innerHTML = "How To PlaY:";
		description.innerHTML =
			"The goal of the game is to match cards with the same images. You may only turn over two cards at a time. If you correctly match a pair of cards, you recieve a point and the cards remain face up. If you turn over an unmatching pair, they will be turned face down again and you may try again. Match all card pairs to win the game.";
		howToPlayWindow.append(closeWindowButton, heading, description);
		menu.append(howToPlayWindow);
	});
	quiteGameOption.addEventListener("click", () => {
		const quiteGameWarning = document.createElement("h3");
		const acceptButton = document.createElement("button");
		const declineButton = document.createElement("button");

		quiteGameWarning.innerHTML = "Are you sure You want to quit game?";
		acceptButton.innerHTML = "Yes!";
		declineButton.innerHTML = "No!";

		quiteGameWarning.classList.add("memory-game__warning");
		acceptButton.classList.add("memory-decision-btn");
		declineButton.classList.add("memory-decision-btn");

		menu.append(quiteGameWarning, acceptButton, declineButton);
	});
};

const listner = (event) => {
	event.animationName = "";
};

const newGame = (difficulty) => {
	const gameScreen = document.querySelector("main");
	const menu = document.createElement("div");
	const heading = document.createElement("h2");
	const cardContainer = document.createElement("div");
	const cards = shuffleCards(selectCards(shuffleCards(getCards()), difficulty));

	const turnCounter = document.createElement("p");

	gameScreen.innerHTML = "";
	gameScreen.classList.add("memory-game--game-screen");
	menu.classList.add("memory-game__menu");

	heading.classList.add("memory-game__menu-heading");
	cardContainer.classList.add("memory-game__card-container");
	turnCounter.classList.add("memory-game__turn-counter");

	heading.innerHTML = "Menu";
	turnCounter.innerHTML = `Moves: ${turnCount}`;

	menu.appendChild(heading);

	gameScreen.append(menu, cardContainer, turnCounter);

	cards.forEach((crd) => {
		const card = document.createElement("div");
		const cardFace = document.createElement("img");
		const cardBack = document.createElement("img");

		card.classList.add("card");
		cardFace.classList.add("card__face");
		cardBack.classList.add("card__back");
		// card.classList.add("flipped");

		card.dataset.id = crd.id;

		cardFace.src = crd.faceImage;
		cardBack.src = "../illustrations/card-decks/patchwork-animals/card-back.png"; //prettier-ignore
		card.append(cardFace, cardBack);

		cardContainer.appendChild(card);

		// functionality

		card.addEventListener("click", () => {
			// card.addEventListener(
			// 	"animationend",
			// 	function () {
			// 		card.animationName = "";
			// 	},
			// 	false
			// );
			card.classList.toggle("card--flipped");
			// card.classList.add("card--flip-card");
			userCardSelection.push(card);
			if (userCardSelection.length === 2) {
				turnCount++;
				turnCounter.innerHTML = `Moves: ${turnCount}`;
				const cards = document.querySelectorAll(".card");
				cards.forEach((card) =>
					card.classList.toggle("card--click-event-disabled")
				);
				let cardsMatch = userCardSelection[0].dataset.id === userCardSelection[1].dataset.id; //prettier-ignore
				if (cardsMatch) {
					userCardMatches = [...userCardMatches, ...userCardSelection];
					userCardSelection = [];
					cards.forEach((card) =>
						card.classList.toggle("card--click-event-disabled")
					);
				}
				setTimeout(() => {
					if (!cardsMatch) {
						userCardSelection.forEach((card) => {
							card.classList.toggle("card--flipped");
						});

						cards.forEach((card) =>
							card.classList.toggle("card--click-event-disabled")
						);
						userCardSelection = [];
					}
				}, "1500");
				if (userCardMatches.length === cards.length) {
					console.log("You have won the game");
					//renderHomeScreen
					//renderCongratulationsWindow
					// yes/no close congrats window
					// yes - renderDifficultyOptions
					// NO - renderHomeScreenButtons
				}
			}
		});
	});

	heading.addEventListener("click", () => {
		renderMenuOptions(menu);
	});
};

const positionBanner = () => {
	const banner = document.querySelector(".memory-game__banner");
	banner.classList.toggle("memory-game__banner--top");
};

const closeWindow = () => {
	const homeScreen = document.querySelector("main");
	const window = document.querySelector(".window");
	window.remove();
	renderHomeScreenButtons(homeScreen);
	positionBanner();
};

const removeHomeScreenButtons = () => {
	const buttons = document.querySelectorAll(".memory-game__btn");
	buttons.forEach((btn) => {
		btn.remove();
	});
};

const renderDifficultyMenu = (htmlMainElement) => {
	const menuWindow = document.createElement("div");
	const closeWindowButton = document.createElement("button");
	const heading = document.createElement("h2");
	const menu = document.createElement("ol");
	const easy = document.createElement("li");
	const medium = document.createElement("li");
	const hard = document.createElement("li");
	const difficultyOptions = [easy, medium, hard];

	menuWindow.classList.add("memory-game__difficulty-menu-window", "window");
	closeWindowButton.classList.add("memory-game__close-btn");
	heading.classList.add("memory-game__heading");
	menu.classList.add("memory-game__difficulty-menu");
	easy.classList.add("memory-game__difficulty-menu-option");
	medium.classList.add("memory-game__difficulty-menu-option");
	hard.classList.add("memory-game__difficulty-menu-option");

	closeWindowButton.innerHTML = "x";
	heading.innerHTML = "Select Difficulty";
	easy.innerHTML = "Easy";
	medium.innerHTML = "Medium";
	hard.innerHTML = "Hard";

	menu.append(easy, medium, hard);
	menuWindow.append(closeWindowButton, heading, menu);

	htmlMainElement.appendChild(menuWindow);

	//functionality:
	closeWindowButton.addEventListener("click", closeWindow);
	difficultyOptions.forEach((Option) => {
		Option.addEventListener("click", (e) => {
			newGame(e.target.innerHTML);
		});
	});
};

const renderHowToPlayWindow = (htmlMainElement) => {
	const howToPlayWindow = document.createElement("div");
	const closeWindowButton = document.createElement("button");
	const heading = document.createElement("h2");
	const description = document.createElement("p");
	const paragraph1 = "The goal of the game is to match cards with the same images. You may only turn over two cards at a time. If you correctly match a pair of cards, you receive a point and the cards remain face up. If you turn over an unlatching pair, they will be turned face down again and you may try again. Match all card pairs to win the game."; //prettier-ignore
	const paragraph2 = "The difficulty determines how many pairs of cards need to be matched in order to win the game. Easy (4), Medium (8), Hard (16)"; //prettier-ignore
	const lineBreak = document.createElement("span");

	howToPlayWindow.classList.add("memory-game__how-to-play-window", "window");
	closeWindowButton.classList.add("memory-game__close-btn");
	heading.classList.add("memory-game__heading");
	description.classList.add("memory-game__description");
	lineBreak.classList.add("memory-game__description-line-break");

	closeWindowButton.innerHTML = "x";
	heading.innerHTML = "How to Play";

	description.append(paragraph1, lineBreak, paragraph2);
	howToPlayWindow.append(closeWindowButton, heading, description);
	htmlMainElement.appendChild(howToPlayWindow);

	//functionality:
	closeWindowButton.addEventListener("click", closeWindow);
};

const renderHomeScreenButtons = (homeScreen) => {
	const buttonContainer = document.createElement("div");
	const playGameButton = document.createElement("button");
	const howToPlayButton = document.createElement("button");

	buttonContainer.classList.add("memory-game__btn-container");
	playGameButton.classList.add("memory-game__btn");
	howToPlayButton.classList.add("memory-game__btn");

	playGameButton.innerHTML = "Play game";
	howToPlayButton.innerHTML = "HOw to play...";

	buttonContainer.append(playGameButton, howToPlayButton);
	homeScreen.append(buttonContainer);

	//functionality:
	playGameButton.addEventListener("click", () => {
		const homeScreen = document.querySelector("main");
		renderDifficultyMenu(homeScreen);
		removeHomeScreenButtons();
		positionBanner();
	});
	howToPlayButton.addEventListener("click", () => {
		const homeScreen = document.querySelector("main");
		renderHowToPlayWindow(homeScreen);
		removeHomeScreenButtons();
		positionBanner();
	});
};

const renderMemoryGame = () => {
	//considering a div with a class of homeScreen to house all of these elements
	const memoryGame = document.createElement("main");
	const banner = document.createElement("div");
	const title = document.createElement("h1");
	const subtitle = document.createElement("p");

	memoryGame.classList.add("memory-game");
	banner.classList.add("memory-game__banner");
	title.classList.add("memory-game__title");
	subtitle.classList.add("memory-game__subtitle");

	title.innerHTML = "MemorY";
	subtitle.innerHTML = "A gAme for your whOle Brain";

	banner.append(title, subtitle);
	memoryGame.append(banner);

	renderHomeScreenButtons(memoryGame);

	documentBody.appendChild(memoryGame);
};

window.onload = () => {
	renderMemoryGame();
};
