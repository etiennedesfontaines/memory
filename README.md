# Frontend Mentor - FAQ accordion card

## Minimum Viable Product (MVP) / Brief:

Design and build a digital version of the card game "memory".

Users must be instructed how to play the game should they not already know.
Users must be able to select one of three difficulties, easy, medium, hard, each influencing the number of cards that will be dealt and need to be matched in order to win the game. Cards must be dealt in pairs (even numbers) and all pairs must be unique.

Once a difficulty is selected, the corresponding number of card pairs must be shuffled and dealt face down. The user must have the ability to select a card, at which point it must turn over, revealing its face image. The revealed card may no longer be selected by the user. They can now select a second card which will respond in the same way. The user may not select and reveal more than two cards at any given time. If the user selects non matching cards, they will turn face down again and the user may try again. If a matching pair of cards is selected, they must remain face up and unselectable. The user can then select two more cards with the same rules applied. Once the user has managed to making matching pairs from all the cards on the table, they win and the game is over.

Upon completing the game the user is congratulated, presented with the difficulty played and number of turns it took them to win and offered another game. Should they agree they are asked to reselct difficult. Should they not they are directed back to the home screen.

The user must be able to select from an in game menu that gives them options to start a new game, read how to play, quit the current game. If the user selects "new game" or "quit game" they must be prompted with a warning asking if they are sure, because selecting either of these will terminate and lose the progress of their current game.
When the ingame menu is open, the user must not be able to play the game (select and reveal cards), they can only do so once the menu is closed again.

Include option to view credits in menu.

## Extras (To be added in later iterations):

Game has music and sound effects that user can independantly adjust by changing volume or muting and unmuting.

Cards animate from floor of background onto wall where game is played.

Music notes animate up from character on right hand side of background image.

Local memory of best score presented upon game completion.

## Design:

![Design preview for the FAQ accordion card coding challenge](./design/desktop-preview.jpg)

- Game can only be played in landscape, irrespective of device.

- Do I to increase the left/ right margin space on mobile to account for speaker/ front camera?

## Development:

### Approach:

I've chosen to build this project exclusively with vanilla JS.
I have made this choice as a learning exercise rather than because it is what I consider best practice. There are various functions and features that I think would be optimised by a different approach, such as using toggle classes and css selectors to show and hide home screen buttons or control ingame menu opening and closing, instead of creating and removing elements from the DOM using JS. But my previous build (TwoAngels website) was light of JS and heavy on HTML and CSS, and I think it will be most beneficial for me to use this project as an opertunity to practice and showcase my vanilla JS tools instead.

### Pseudo Code:

- index.html:

  - doctype html
  - head
  - body
  - main with background image of childs room

- on page load:

  - renderHomeOptions(): Two buttons ("New Game" and "How to play" each with a click listener)

  - Note for below funcdtionality: "Perhaps a remove elements function to remove any unwanted elements at the beginning of various renderFunctions?

    - "How to play": When clicked, removeHomeOptions() and renderhowToPlay(), when closed renderHomeOptions()

    - "New Game": When clicked, removeHomeOptions() and renderDifficultyOptions( easy, medium, hard)
      - easy/medium/hard: When clicked, removeHomeOptions(),
        populateBoard(
        shuffleDeck(), dealCards(), renderMenu(), renderMovesCounter()
        )

- CardDeckDataType =
  [
  {
  cardName: "animal name",
  faceImage: url("./images/animalNameImage"),
  backImage: url("./images/cardBackground)
  },
  {
  cardName: "animal name",
  faceImage: url("./images/animalNameImage"),
  backImage: url("./images/cardBackground)
  }

]

### Note:

- BEM naming convention
