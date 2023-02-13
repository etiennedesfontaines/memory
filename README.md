# Memory Game

## Questions:

- Why should Id's not be 0 indexed?
- Shuffle function (sort with Math.random)
- Do I need to keep my h1?

- Is it semantically correct to have the how to play menu heading as an h3?
  It is a subCategory of the Menu but its content is not related to the menu...

- I've used the difficulty inner HTML to as the value to check in the conditional that selects cards to deal. Is it better practice to create a dataset for this purpose and reference that instead?

- array.slice is behaving in a way that seems odd to me selectCardsfunction.

## Minimum Viable Product (MVP) / Brief:

Design and build a digital version of the card game "memory".

Users must be instructed how to play the game should they not already know.
Users must be able to select one of three difficulties, easy, medium, hard, each influencing the number of cards that will be dealt and need to be matched in order to win the game. Cards must be dealt in pairs (even numbers) and all pairs must be unique.

Once a difficulty is selected, the corresponding number of card pairs must be shuffled and dealt face down. The user must have the ability to select a card, at which point it must turn over, revealing its face image. The revealed card may no longer be selected by the user. They can now select a second card which will respond in the same way. The user may not select and reveal more than two cards at any given time. If the user selects non matching cards, they will turn face down again and the user may try again. If a matching pair of cards is selected, they must remain face up and unselectable. The user can then select two more cards with the same rules applied. Once the user has managed to make matching pairs from all the cards on the table, they win and the game is over.

Upon completing the game the user is congratulated, presented with the difficulty played and number of turns it took them to win and offered another game. Should they agree they are asked to reselct difficult. Should they not they are directed back to the home screen.

The user must be able to select from an in game menu that gives them options to start a new game, read how to play, quit the current game. If the user selects "new game" or "quit game" they must be prompted with a warning asking if they are sure, because selecting either of these will terminate and lose the progress of their current game.
When the ingame menu is open, the user must not be able to play the game (select and reveal cards), they can only do so once the menu is closed again.

Include option to view credits in menu.

### MVP List:

- Home screen:

  - Heading
  - subheading
  - buttons
    - Play Game: Shows select difficulty window
    - How to play: Shows how to play window

- How to play window

  - Description of how to play.
  - close screen button:
    - closes how to play window.
    - re-renders home screen buttons.

- Select Difficulties window

  - Options of Easy, Medium, Hard buttons: Selecting starts new game.
    - selects cards
    - double selection into pairs
    - shuffles cards
    - delas cards
  - close screen button:
    - closes how to play window.
    - re-renders home screen buttons.

- inGame Screen

  - clickable cards (face down):

    - clicking card reveals card face (animation): subsequent clicks have no action.
    - clicking second card reveals card face (animation): subsequent clicks have no action.
    - Only two cards can be clicked per turn.
    - if cards match they remain face up and cannot be clicked. User can select new pair of cards.
    - if cards do not match, the remain face up for set amount of time then turn face down again (animation). User can now select new pair of cards.
    - if all cards are face up (mateched), game ends - End of game screen rendered.

  - Turn counter:

    - incriments by 1 for every two cards flipped.
    - resets to 0 on new game.

  - Menu: clicking pauses game and reveals menu options.
    - cards greyed out and non clickable.
    - moves counter greyed out
    - menu options:
      - new game: clicking reveals warning in menu bar: are you sure?
        - yes: game is ended, user is redirected to select difficulty screen.
        - no: warning is closed. User remains in menu.
      - how to play: clicking reveals how to play description in menu bar.
        - close button: clicking closes how to play desc and user remains in menu.
      - quit game
      - clicking reveals warning in menu bar: are you sure?
        - yes: game is ended, user is redirected to home screen.
      - no: warning is closed. User remains in menu.
    - close button: clicking closes menu option and resumes game.

- endOfGameScreen
  - congradulation message displayed
    - number of turns taken to complete game displayed.
    - new game option presented:
      - yes - renders select difficulty screen.
      - no - returns to home page.

## Extras (To be added in later iterations):

- Game has music and sound effects that user can independantly adjust by changing volume or muting and unmuting.

- Cards animate from floor of background onto wall where game is played.

- Music notes animate up from character on right hand side of background image.

- Local memory of best score presented upon game completion.

- All copy is animated in as if being written

- When new game is created - title, subtitle and difficulty menu fade or are erased before cards are dealt into game.

- clickable element shudder to show they can be interacted with

- Consider lives: A limited amount of turns to try match all cards, dictated by difficulty and able to be turned on an off in settings.

## Design:

- write out design brief and illustration brief, populating each with sourced images.

![Design preview for the FAQ accordion card coding challenge](./design/desktop-preview.jpg)

- Game can only be played in landscape, irrespective of device.

- Do I to increase the left/ right margin space on mobile to account for speaker/ front camera?

## Development:

### Approach:

I've chosen to build this project exclusively with vanilla JS.
I have made this choice as a learning exercise rather than because it is what I consider best practice. There are various functions and features that I think would be optimised by a different approach, such as using toggle classes and css selectors to show and hide home screen buttons or control ingame menu opening and closing, instead of creating and removing elements from the DOM using JS. But my previous build (TwoAngels website) was light of JS and heavy on HTML and CSS, and I think it will be most beneficial for me to use this project as an opertunity to practice and showcase my vanilla JS tools instead.

### Pseudo Code:

- gameMenuContainer
  - close btn
  - heading "menu"
  - gameMenu = ul //render menu func
    - menuOptions = li //render menu func

### Note:

- BEM naming convention

  - Block: A functionally independent page component that can be reused.
    The block name describes its purpose (what is it?) not it's state (what does it look like?) e.g menu or button.

  - Element: A composite part of the block that can't be used seperately from it.
    The element name describes its purpose (what is it?) not it's staten(what type / what does it look like?) e.g **item or **text.

    An element is always part of a block and shouldn't be used seperately from it.

  - Modifier: An entitiy that defines the apperance, state or behavior of a block or element. --ocean-theme, --active, --red;

- Naming advice from slack "Grace":
  - following some established code standard or establishing your own
    using single class selectors as much as possible in css.
  - Having a few classes on an element in html is much easier to understand than a long css selector
  - using separate prefixed classes for javascript selectors ie js-my-class. You'd never style on those so it's obvious looking at html that it is for javascript so you know where to look.
  - Never using ids as selectors in css or javascript
  - Only nesting pseudos or media queries in scss/css

## issue list:

- When card selection isn't a match, user can select first card of the next pair beofre initial pair selection has animated back to front down. Delay using an event listener for the end of the animation.

- card sizing: //setting height and width to 100% achieves unified colum and grid row gap, but I'd rather set only the height and the other to auto maintaining image aspect ratio... But this creates problems with card overlap on certain screen sizes.

- card-container: I'm struggling to grid-template-columns responsively and have the cards behave (size) as intended. I'd like to always have four rows, but have the amount of colums be dictated by the number of cards, so it will add rows as and when there is no more space in the grid. This will allow that I set the grid on the card container and it adjusts depending on the amount of cards dealt, rather than having to change the grid setting deppending on difficulty selection.

- menu window margin declaration isn't affecting top and bottom margin.

- Should clicking menu option a second time remove menu options or just do nothing?

- Moves counter causes layout shift on update.

- cards are lagging when loading, exposing front face before game has begun - further image optimisation needed?
  The problem seems to worsen as more cards need to be loaded.

- some functions run to create elements at times when they arent needed, then remove functions for those are automatically run to remove them. e.g end of Game and closeWindow. Better to only run homeScreenOptions func when it is needed - using a conditional to control this will likely work.

- Refactor all code and seperate both styling and js into different documents depending on its function.

- CSS components for values used multiple times

- CSS mixins for methods used multiple times.

//Below is the implementation to change selectCardsForGame functionality to prevent the need to shuffle the cards twice.

// const length = 10;
// const randomNum = Math.floor(Math.random() length + 1);
//remove selected element
// run again but against new array length

//Math.floor(Math.random() array.length + 1);

//[]
// const closeSubMenu = (elementsToDelete) => {
// elementsToDelete.forEach((className) => {
// const domElement = document.querySelector(className);
// if (domElement) {
// domElement.remove();
// } else {
// throw new Error(`domElement with ${className} not found!`);
// }
// });
// };
