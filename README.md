# Memory Game

## Questions:

- I've noticed my designs to date have not accounted for the 80px of screen space taken up by the browser search and tab bar - I've never heard about needing to do this but it definitely affects the build....?

- Is it semantically correct to have the how to play menu heading as an h3?
  It is a subCategory of the Menu but its content is not related to the menu...

- I've used the difficulty inner HTML as the value to check in the conditional that selects cards to deal. Is it better practice to create a dataset for this purpose and reference that instead?

## Minimum Viable Product (MVP) / Brief:

Design and build a digital version of the card game "memory".

Users must be instructed how to play the game should they not already know.
Users must be able to select one of three difficulties, easy, medium, hard, each influencing the number of cards that will be dealt. Users must match all cards in order to win the game. Cards must be dealt in pairs (even numbers) and all pairs must be unique.

Once a difficulty is selected, the corresponding number of card pairs must be shuffled and dealt face down. The user must have the ability to select a card, at which point it must turn over, revealing its face image. The revealed card may no longer be selected by the user. They can now select a second card which will respond in the same way. The user may not select and reveal more than two cards at any given time. If the user selects non matching cards, they will turn face down again and the user may try again. If a matching pair of cards is selected, they must remain face up and no longer selectable. The user can then select two more cards with the same rules applied. Once the user has managed to make matching pairs from all the cards on the table, they win - the game is over.

Upon completing the game the user is congratulated, presented with the number of turns it took them to win, and offered another game. Should they agree they are asked to re-select difficulty. Should they not, they are directed back to the home screen.

The user must be able to select from an in-game menu that gives them options to start a new game, read how to play or quit the current game. If the user selects "new game" or "quit game" they must be prompted with a warning asking if they are sure, because selecting either of these will terminate and lose the progress of their current game.
When the in-game menu is open, the user must not be able to play the game (select and reveal cards), they can only do so once the menu is closed again.

### MVP List:

- Home screen:

  - title
  - subtitle
  - buttons
    - Play Game: Shows select difficulty window
    - How to play: Shows how to play window

- How to play window

  - Description of how to play.
  - close screen button:
    - closes the how to play window.
    - re-renders home screen buttons.

- Select Difficulties window

  - Options of Easy, Medium, Hard buttons: Selecting starts a new game.
    - selects cards
    - double selection into pairs
    - shuffles cards
    - deals cards
  - close screen button:
    - closes the how to play window.
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

    - increments by 1 for every two cards flipped.
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

  - congratulation message displayed
    - number of turns taken to complete game displayed.
    - new game option presented:
      - yes - renders select difficulty screen.
      - no - returns to home page.

- Game can only be played in landscape, irrespective of device.

## Extras (To be added in later iterations):

- Game has music and sound effects that user can independently adjust by changing volume or muting and unmuting.

- If music is playing, music notes animate up from character on right hand side of background image.

- Cards animate from floor of background onto wall when a new game begins.

- Best score presented upon game completion: store in local memory.

- All copy is animated in as if being written

- When a new game is created - title, subtitle and difficulty menu fade or are erased before cards are dealt into the game.

- clickable elements shudder to show they can be interacted with.

- Consider lives: A limited amount of turns to try match all cards, dictated by difficulty and able to be turned on an off in settings.

- Game adapted to be more accessible - playable for users requiring assistive technology, namely voice readers and users who cannot use a mouse.

## Design:

- write out design brief and illustration brief, populating each with sourced images.
  ![Design preview for the FAQ accordion card coding challenge](./design/desktop-preview.jpg)

## Development:

### Approach:

I've chosen to build this project using predominantly vanilla JS.
I have made this choice as a learning exercise rather than because it is what I consider the most effective solution for this build. There are various functions and features that I think can be optimized by a different approach, such as using toggle classes and css selectors to show and hide home screen buttons or controls the in-game menu opening and closing, rather than creating and removing elements from the DOM using JS. But my previous build (TwoAngels website) was light of JS and heavy on HTML and CSS, and I think it will be most beneficial for me to use this project as an opportunity to practice and showcase some of my vanilla JS tools instead.

## Note:

- BEM naming convention

  - Block: A functionally independent page component that can be reused.
    The block name describes its purpose (what is it?) not it's state (what does it look like?) e.g menu or button.

  - Element: A composite part of the block that can't be used separately from it.
    The element name describes its purpose (what is it?) not it's staten(what type / what does it look like?) e.g **item or **text.

    An element is always part of a block and shouldn't be used separately from it.

  - Modifier: An entity that defines the appearance, state or behavior of a block or element. --ocean-theme, --active, --red;

## Issues list:

- Moves counter causes layout shift on update.
  solutions tried:

1. creating a pseudo element ::after, giving it content of 000, positioning it absolute and right 0. But the layout shift still occurs.
2. Setting justify-self to start and adding a padding of 16rem to the left side of the element. It works but it does not allow for it to have a right side distance of 1.6rem from the page border, as it was designed to be, and as the menu on the opposite side of the screen is.
3. I've tried using a parent container but cannot seem to resolve the issue even then...

- end of game screen needs to be redesigned.

## To Do:

- Bash: I'd like the animals aligned within their cards please.
- Braj: Illustrated border?

- Deploy game

## Lessons:

- Always design and build mobile first.
  With just your html markup, you will have a responsive layout until you add styles that cause it to no longer act responsively. So rather than starting desktop and then writing media queries to remove already written styles that don't allow for fluid responsiveness, build mobile first and add complexity as needed.

  Having not done so resulted in a mountain of issues that necessitated I refactor to a mobile first approach. A lot of extra work later, a lesson well learnt.

- optimizing image dimension and size by device and declaring image size in css - Positively affects page load speed, user exp and seo by way of cumulative layout shift score being low.

- Considering the browser tab and search bar in the design process.
  They generally reduce the window height by around 80px.

- Apparently: I encourage you not to approach media queries like this.
