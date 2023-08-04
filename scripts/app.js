let turnCount = 0;
let userCardSelection = [];
let userCardMatches = [];

const documentBody = document.body;
const getCards = () => [
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/aardvark.png`,
		altText:"A card-face showing an illustrated, patchwork, plush toy aardvark", //prettier-ignore
		id: 1,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/badger.png`,
		altText: "A card-face showing an illustrated, patchwork, plush toy badger",
		id: 2,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/chiwawa.png`,
		altText: "A card-face showing an illustrated, patchwork, plush toy chiwawa",
		id: 3,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/duck.png`,
		altText: "A card-face showing an illustrated, patchwork, plush toy duck",
		id: 4,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/fox.png`,
		altText: "A card-face showing an illustrated, patchwork, plush toy fox",
		id: 5,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/frog.png`,
		altText: "A card-face showing an illustrated, patchwork, plush toy frog",
		id: 6,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/highland-cow.png`,
		altText:"A card-face showing an illustrated, patchwork, plush toy highland cow", //prettier-ignore
		id: 7,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/koala.png`,
		altText: "A card-face showing an illustrated, patchwork, plush toy koala",
		id: 8,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/lama.png`,
		altText: "A card-face showing an illustrated, patchwork, plush toy lama",
		id: 9,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/monster.png`,
		altText: "A card-face showing an illustrated, patchwork, plush toy monster",
		id: 10,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/panda.png`,
		altText: "A card-face showing an illustrated, patchwork, plush toy panda",
		id: 11,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/penguin.png`,
		altText: "A card-face showing an illustrated, patchwork, plush toy penguin",
		id: 12,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/rabbit.png`,
		altText: "A card-face showing an illustrated, patchwork, plush toy rabbit",
		id: 13,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/reindeer.png`,
		altText:"A card-face showing an illustrated, patchwork, plush toy reindeer", //prettier-ignore
		id: 14,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/scotty.png`,
		altText:"A card-face showing an illustrated, patchwork, plush toy scotty dog", //prettier-ignore
		id: 15,
	},
	{
		faceImage: `../images/illustrations/card-decks/patchwork-animals/teddy.png`,
		altText:"A card-face showing an illustrated, patchwork, plush toy teddy bear", //prettier-ignore
		id: 16,
	},
];

const selectCardsForGame = (cards, difficulty) => {
	switch (difficulty) {
		case "Easy":
			return cards.slice(8).concat(cards.slice(8));
			break;
		case "Medium":
			return cards.slice(0, 12).concat(cards.slice(0, 12));
			break;
		case "Hard":
			return [...cards, ...cards];
			break;
	}
};

const shuffleCards = (cards) => {
	cards.sort(() => Math.random() - 0.5);
	return cards;
};

const addClassNames = (elements, classes) => {
	elements.forEach((element) => {
		element.classList.add(...classes);
	});
};

const renderEndOfGameWindow = (homeScreen) => {
	const endOfGameWindow = document.createElement("div");
	const heading = document.createElement("h2");
	const result = document.createElement("p");
	const optionsHeading = document.createElement("h3");
	const playAgainOptionsContainer = document.createElement("div");
	const confirmOption = document.createElement("btn");
	const declineOption = document.createElement("btn");

	heading.innerHTML = "Congratulations!";
	result.innerHTML = `You matched all pairs in ${turnCount} turns.`;
	optionsHeading.innerHTML = "Would you like to Play again?";
	confirmOption.innerHTML = "Yes!";
	declineOption.innerHTML = "No!";

	endOfGameWindow.classList.add("memory-game__end-of-game-window", "window");
	result.classList.add("memory-game__result");
	confirmOption.classList.add("memory-game__decision-option","memory-game__decision-option--confirm"); //prettier-ignore
	declineOption.classList.add("memory-game__decision-option");

	const headings = [heading, optionsHeading];
	addClassNames(headings, [
		"memory-game__heading",
		"memory-game__heading--end-of-game",
	]);

	playAgainOptionsContainer.append(confirmOption, declineOption);
	endOfGameWindow.append(
		heading,
		result,
		optionsHeading,
		playAgainOptionsContainer
	);
	homeScreen.append(endOfGameWindow);
	turnCount = 0;
	userCardMatches = [];

	//functionality
	confirmOption.addEventListener("click", () => {
		closeWindow(false);
		positionBanner();
		renderDifficultyOptions(homeScreen);
	});
	declineOption.addEventListener("click", () => {
		closeWindow();
	});
};

const pauseGame = () => {
	const cardContainer = document.querySelector(".memory-game__card-container");
	const turnCounter = document.querySelector(".memory-game__turn-counter");
	cardContainer.classList.add("memory-game__card-container--game-paused");
	turnCounter.classList.add("memory-game__turn-counter--game-paused");
};

const resumeGame = () => {
	const cardContainer = document.querySelector(".memory-game__card-container");
	const turnCounter = document.querySelector(".memory-game__turn-counter");
	cardContainer.classList.remove("memory-game__card-container--game-paused");
	turnCounter.classList.remove("memory-game__turn-counter--game-paused");
};

const closeMenu = (menu, ...args) => {
	const elementsToKeep = [...args];
	for (let i = 0; i < menu.childNodes.length; i++) {
		const childNode = menu.childNodes[i];
		if (!elementsToKeep.includes(childNode.classList.value)) {
			menu.removeChild(childNode);
			i--;
		}
	}
};

const renderMenuOptions = (menu, inGameScreen) => {
	const closeMenuButton = document.createElement("btn");
	const menuOptions = document.createElement("ul");
	const newGameOption = document.createElement("li");
	const howToPlayOption = document.createElement("li");
	const creditsOption = document.createElement("li");
	const quiteGameOption = document.createElement("li");

	closeMenuButton.classList.add("memory-game__close-btn", "memory-game__close-btn--game-menu"); //prettier-ignore
	menuOptions.classList.add("memory-game__menu-options");

	const elements = [
		newGameOption,
		howToPlayOption,
		creditsOption,
		quiteGameOption,
	];
	addClassNames(elements, ["memory-game__menu-option"]);

	closeMenuButton.innerHTML = "x";
	newGameOption.innerHTML = "New Game";
	howToPlayOption.innerHTML = "How to play?";
	creditsOption.innerHTML = "Credits";
	quiteGameOption.innerHTML = "Quit";

	menuOptions.append(
		newGameOption,
		howToPlayOption,
		creditsOption,
		quiteGameOption
	);
	menu.append(closeMenuButton, menuOptions);

	//functionality

	closeMenuButton.addEventListener("click", () => {
		const menuHeading = document.querySelector(".memory-game__menu-heading");
		closeMenu(
			menu,
			"memory-game__menu-heading memory-game__menu-heading--menu-open"
		);
		menuHeading.classList.toggle("memory-game__menu-heading--menu-open");
		resumeGame();
	});

	newGameOption.addEventListener("click", () => {
		const newGameWarning = document.createElement("h3");
		const confirmOption = document.createElement("button");
		const declineOption = document.createElement("button");

		newGameWarning.innerHTML = "Are you sure You want to start a new game?";
		confirmOption.innerHTML = "Yes!";
		declineOption.innerHTML = "No!";

		newGameWarning.classList.add("memory-game__user-action-warning");
		confirmOption.classList.add(
			"memory-game__decision-option",
			"memory-game__decision-option--confirm"
		);
		declineOption.classList.add("memory-game__decision-option");

		closeMenu(
			menu,
			"memory-game__menu-heading memory-game__menu-heading--menu-open",
			"memory-game__close-btn memory-game__close-btn--game-menu"
		);

		menu.append(newGameWarning, confirmOption, declineOption);

		//functionality

		declineOption.addEventListener("click", () => {
			closeMenu(
				menu,
				"memory-game__menu-heading memory-game__menu-heading--menu-open"
			);
			renderMenuOptions(menu);
		});
		confirmOption.addEventListener("click", () => {
			const memoryGame = document.querySelector(".memory-game");
			const inGameScreen = document.querySelector(".memory-game__in-game-screen"); //prettier-ignore
			inGameScreen.remove();
			renderHomeScreen(memoryGame, false);
			const homeScreen = document.querySelector(".memory-game__home-screen");
			positionBanner();
			renderDifficultyOptions(homeScreen);
		});
	});

	creditsOption.addEventListener("click", () => {
		const creditsWindow = document.createElement("div");
		const closeWindowButton = document.createElement("button");
		const heading = document.createElement("h3");
		const contributorList = document.createElement("ul");
		const contributorListItem1 = document.createElement("li");
		const contributorListItem2 = document.createElement("li");
		const contributorListItem3 = document.createElement("li");

		closeWindowButton.innerHTML = "x";
		heading.innerHTML = "Contributors:";
		contributorListItem1.innerHTML = `<a href="https://etiennedesfontaines.com/" target="_blank" rel="noreferrer noopener" >Etienne Desfontaines</a> <ul> <li>- Ideation</li> <li>- Design</li> <li>- Development</li></ul>`;
		contributorListItem2.innerHTML = `<a href="https://www.instagram.com/plants_and_paper/?hl=en" target="_blank" rel="noreferrer noopener" >Pascale Desfontaines</a> <ul> <li>- illustration</li></ul>`;
		contributorListItem3.innerHTML = `<a href="https://www.behance.net/bastiendesfont" target="_blank" rel="noreferrer noopener" >Bastien Desfontaines</a> <ul> <li>- Ideation assist</li> <li>- Design assist</li> <li>- Image treatment</li></ul>`;

		creditsWindow.classList.add("memory-game__how-to-play-window","memory-game__how-to-play-window--game-menu"); //prettier-ignore
		closeWindowButton.classList.add("memory-game__close-btn","memory-game__close-btn--how-to-play-game-menu"); //prettier-ignore
		heading.classList.add("memory-game__heading", "memory-game__heading--game-menu") //prettier-ignore
		contributorList.classList.add("memory-game__contributor__list");

		closeMenu(
			menu,
			"memory-game__menu-heading memory-game__menu-heading--menu-open",
			"memory-game__close-btn memory-game__close-btn--game-menu"
		);

		contributorList.append(
			contributorListItem1,
			contributorListItem2,
			contributorListItem3
		);
		creditsWindow.append(closeWindowButton, heading, contributorList);
		menu.append(creditsWindow);

		closeWindowButton.addEventListener("click", () => {
			closeMenu(
				menu,
				"memory-game__menu-heading memory-game__menu-heading--menu-open",
				"memory-game__close-btn memory-game__close-btn--game-menu"
			);
			renderMenuOptions(menu);
		});
	});

	howToPlayOption.addEventListener("click", () => {
		const howToPlayWindow = document.createElement("div");
		const closeWindowButton = document.createElement("button");
		const heading = document.createElement("h3");
		const howToPlayDescription = document.createElement("p");

		closeWindowButton.innerHTML = "x";
		heading.innerHTML = "How To PlaY:";
		howToPlayDescription.innerHTML = "The goal of the game is to match cards with the same images. You may turn over two cards at a time. If you match a pair of cards, you receive a point and the cards remain face up. If the cards do not match, they will be turned face down again and you may try again. Match all card pairs to win the game."; //prettier-ignore

		howToPlayWindow.classList.add("memory-game__how-to-play-window","memory-game__how-to-play-window--game-menu"); //prettier-ignore
		closeWindowButton.classList.add(
			"memory-game__close-btn",
			"memory-game__close-btn--how-to-play-game-menu"
		);
		heading.classList.add("memory-game__heading", "memory-game__heading--game-menu") //prettier-ignore
		howToPlayDescription.classList.add("memory-game__how-to-play-description");

		closeMenu(
			menu,
			"memory-game__menu-heading memory-game__menu-heading--menu-open",
			"memory-game__close-btn memory-game__close-btn--game-menu"
		);

		howToPlayWindow.append(closeWindowButton, heading, howToPlayDescription);
		menu.append(howToPlayWindow);

		//functionality
		closeWindowButton.addEventListener("click", () => {
			closeMenu(
				menu,
				"memory-game__menu-heading memory-game__menu-heading--menu-open",
				"memory-game__close-btn memory-game__close-btn--game-menu"
			);
			renderMenuOptions(menu);
		});
	});

	quiteGameOption.addEventListener("click", () => {
		const quiteGameWarning = document.createElement("h3");
		const confirmOption = document.createElement("button");
		const declineOption = document.createElement("button");

		quiteGameWarning.innerHTML = "Are you sure You want to quit game?";
		confirmOption.innerHTML = "Yes!";
		declineOption.innerHTML = "No!";

		quiteGameWarning.classList.add("memory-game__user-action-warning");
		confirmOption.classList.add(
			"memory-game__decision-option",
			"memory-game__decision-option--confirm"
		);
		declineOption.classList.add("memory-game__decision-option");

		closeMenu(
			menu,
			"memory-game__menu-heading memory-game__menu-heading--menu-open",
			"memory-game__close-btn memory-game__close-btn--game-menu"
		);

		menu.append(quiteGameWarning, confirmOption, declineOption);

		//functionality
		declineOption.addEventListener("click", () => {
			closeMenu(
				menu,
				"memory-game__menu-heading memory-game__menu-heading--menu-open"
			);
			renderMenuOptions(menu);
		});
		confirmOption.addEventListener("click", () => {
			const memoryGame = document.querySelector(".memory-game");
			const inGameScreen = document.querySelector(".memory-game__in-game-screen"); //prettier-ignore
			inGameScreen.remove();
			renderHomeScreen(memoryGame);
		});
	});
};

const newGame = (difficulty, homeScreen) => {
	turnCount = 0;
	const memoryGame = document.querySelector(".memory-game");
	const inGameScreen = document.createElement("div");
	const menu = document.createElement("div");
	const menuHeading = document.createElement("h2");
	const gameBoard = document.createElement("div");
	const cardContainer = document.createElement("div");
	const cards = shuffleCards(selectCardsForGame(shuffleCards(getCards()), difficulty)); //prettier-ignore
	const turnCounter = document.createElement("p");

	menuHeading.innerHTML = "Menu";
	turnCounter.innerHTML = `Moves: ${turnCount}`;

	inGameScreen.classList.add("memory-game__in-game-screen");
	menu.classList.add("memory-game__menu");
	menuHeading.classList.add("memory-game__menu-heading");
	gameBoard.classList.add("memory-game__board");
	cardContainer.classList.add("memory-game__card-container");
	turnCounter.classList.add("memory-game__turn-counter");

	homeScreen.remove();
	menu.append(menuHeading);

	inGameScreen.append(menu, gameBoard, turnCounter);
	memoryGame.append(inGameScreen);

	cards.forEach((crd) => {
		const card = document.createElement("div");
		const cardFace = document.createElement("img");
		const cardBack = document.createElement("img");

		card.classList.add("card");
		cardFace.classList.add("card__face");
		cardBack.classList.add("card__back");

		card.dataset.id = crd.id;
		cardFace.src = crd.faceImage;
		cardFace.alt = crd.altText;
		cardBack.src = `../images/illustrations/card-decks/patchwork-animals/card-back.png`;
		cardBack.alt = "illustration of a card back with a patchwork quilt pattern";

		card.append(cardFace, cardBack);
		cardContainer.append(card);
		gameBoard.append(cardContainer);

		// functionality
		card.addEventListener("click", () => {
			card.style.animation = "none";
			card.offsetHeight;
			card.style.animation = "flipCard 1 900ms forwards normal";
			card.classList.toggle("card--flipped");

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
						const reEnableClickEvent = (e) => {
							cards.forEach((card) => {
								card.classList.remove("card--click-event-disabled");
							});
							e.target.removeEventListener("animationend", reEnableClickEvent);
						};
						userCardSelection.forEach((card) => {
							card.classList.toggle("card--flipped");
							card.style.animation = "none";
							card.offsetHeight;
							card.style.animation = "flipCard 1 900ms forwards reverse";
							card.addEventListener("animationend", reEnableClickEvent);
						});
						userCardSelection = [];
					}
					if (userCardMatches.length === cards.length) {
						inGameScreen.remove();
						renderHomeScreen(memoryGame, false);
						const homeScreen = document.querySelector(".memory-game__home-screen"); //prettier-ignore
						positionBanner();
						renderEndOfGameWindow(homeScreen);
					}
				}, "1200");
			}
		});
	});

	menuHeading.addEventListener("click", () => {
		pauseGame();
		renderMenuOptions(menu, inGameScreen);
		menuHeading.classList.toggle("memory-game__menu-heading--menu-open");
	});
};

const positionBanner = () => {
	const banner = document.querySelector(".memory-game__banner");
	banner.classList.toggle("memory-game__banner--position-top");
};

const closeWindow = (renderOptions = true) => {
	const homeScreen = document.querySelector(".memory-game__home-screen");
	const window = document.querySelector(".window");
	window.remove();
	if (renderOptions) {
		renderHomeScreenOptions(homeScreen);
	}
	positionBanner();
};

const removeHomeScreenOptions = () => {
	const homeScreenOptions = document.querySelector(".memory-game__home-screen-options-container"); //prettier-ignore
	homeScreenOptions.remove();
};

const renderDifficultyOptions = (homeScreen) => {
	const difficultyOptionsWindow = document.createElement("div");
	const closeWindowButton = document.createElement("button");
	const heading = document.createElement("h2");
	const difficultyOptionsList = document.createElement("ol");
	const easy = document.createElement("li");
	const medium = document.createElement("li");
	const hard = document.createElement("li");
	const difficultyOptions = [easy, medium, hard];

	closeWindowButton.innerHTML = "x";
	heading.innerHTML = "Select Difficulty";
	easy.innerHTML = "Easy";
	medium.innerHTML = "Medium";
	hard.innerHTML = "Hard";

	difficultyOptionsWindow.classList.add("memory-game__difficulty-options-window", "window"); //prettier-ignore
	closeWindowButton.classList.add("memory-game__close-btn");
	heading.classList.add("memory-game__heading","memory-game__heading--home-screen"); //prettier-ignore
	difficultyOptionsList.classList.add("memory-game__difficulty-options-list");

	addClassNames(difficultyOptions, ["memory-game__difficulty-option"]);

	difficultyOptionsList.append(easy, medium, hard);
	difficultyOptionsWindow.append(
		closeWindowButton,
		heading,
		difficultyOptionsList
	);

	homeScreen.append(difficultyOptionsWindow);

	//functionality:
	closeWindowButton.addEventListener("click", closeWindow);

	difficultyOptions.forEach((option) => {
		option.addEventListener("click", (e) => {
			newGame(e.target.innerHTML, homeScreen);
		});
	});
};

const renderHowToPlayWindow = (homeScreen) => {
	const howToPlayWindow = document.createElement("div");
	const closeWindowButton = document.createElement("button");
	const heading = document.createElement("h2");
	const howToPlayDescription = document.createElement("p");
	const paragraph1 = "The goal of the game is to match cards with the same images. You may turn over two cards at a time. If you match a pair of cards, you receive a point and the cards remain face up. If the cards do not match, they will be turned face down again and you may try again. Match all card pairs to win the game."; //prettier-ignore
	const paragraph2 = "The difficulty determines how many pairs of cards are dealt. Easy (8), Medium (12), Hard (16)."; //prettier-ignore
	const lineBreak = document.createElement("span");

	closeWindowButton.innerHTML = "x";
	heading.innerHTML = "How to Play";

	howToPlayWindow.classList.add("memory-game__how-to-play-window", "window");
	closeWindowButton.classList.add("memory-game__close-btn");
	heading.classList.add("memory-game__heading","memory-game__heading--home-screen"); //prettier-ignore
	howToPlayDescription.classList.add("memory-game__how-to-play-description");
	lineBreak.classList.add("line-break");

	howToPlayDescription.append(paragraph1, lineBreak, paragraph2);
	howToPlayWindow.append(closeWindowButton, heading, howToPlayDescription);
	homeScreen.append(howToPlayWindow);

	//functionality:
	closeWindowButton.addEventListener("click", closeWindow);
};

const renderHomeScreenOptions = (homeScreen) => {
	const homeScreenOptionsContainer = document.createElement("div");
	const playGameOption = document.createElement("button");
	const howToPlayOption = document.createElement("button");

	playGameOption.innerHTML = "Play game";
	howToPlayOption.innerHTML = "HOw to play...";

	homeScreenOptionsContainer.classList.add("memory-game__home-screen-options-container"); //prettier-ignore

	const options = [playGameOption, howToPlayOption];
	addClassNames(options, ["memory-game__home-screen-option"]);

	homeScreenOptionsContainer.append(playGameOption, howToPlayOption);
	homeScreen.append(homeScreenOptionsContainer);

	//functionality:
	playGameOption.addEventListener("click", () => {
		removeHomeScreenOptions();
		renderDifficultyOptions(homeScreen);
		positionBanner();
	});
	howToPlayOption.addEventListener("click", () => {
		removeHomeScreenOptions();
		renderHowToPlayWindow(homeScreen);
		positionBanner();
	});
};

const renderHomeScreen = (memoryGame, renderOptions = true) => {
	const homeScreen = document.createElement("div");
	const banner = document.createElement("div");
	const title = document.createElement("h1");
	const subtitle = document.createElement("p");

	title.innerHTML = "MemorY";
	subtitle.innerHTML = "A gAme for your whOle Brain";

	homeScreen.classList.add("memory-game__home-screen");
	banner.classList.add("memory-game__banner");
	title.classList.add("memory-game__title");
	subtitle.classList.add("memory-game__subtitle");

	banner.append(title, subtitle);
	homeScreen.append(banner);
	memoryGame.append(homeScreen);

	if (renderOptions) {
		renderHomeScreenOptions(homeScreen);
	}
};

const renderMemoryGame = () => {
	const memoryGame = document.createElement("main");
	memoryGame.classList.add("memory-game");

	renderHomeScreen(memoryGame);

	documentBody.append(memoryGame);
};

window.onload = () => {
	renderMemoryGame();
};
