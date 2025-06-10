Memory Card Game - React Conversion Guide
1. Project Overview & Setup
1.1 Game Mechanics

Objective: Click Pokemon cards without repeating selections
Scoring: +1 point per unique card clicked
Game Over: Clicking previously selected card ends game
Rounds: Complete by clicking all 12 cards once, then get new Pokemon
Memory Challenge: Cards shuffle after each click

1.2 Required Features

Scoreboard (current score, best score, round counter)
Pokemon API integration (12 random Pokemon per round)
Card shuffling after each click
LocalStorage for best score persistence
Loading states and error handling
Game over modal
Responsive design

1.3 File Structure Setup
src/
├── components/
│   ├── Scoreboard.jsx
│   ├── GameBoard.jsx
│   ├── Card.jsx
│   ├── GameOverModal.jsx
│   └── LoadingSpinner.jsx
├── hooks/
│   └── useLocalStorage.js
├── utils/
│   └── pokemonApi.js
├── App.jsx
├── App.css
└── main.jsx

2. State Management Setup
2.1 Core Game State (useState hooks needed in App.jsx)
javascript// Game data
const [pokemon, setPokemon] = useState([]);
const [clickedPokemon, setClickedPokemon] = useState(new Set());

// Scoring
const [currentScore, setCurrentScore] = useState(0);
const [bestScore, setBestScore] = useState(0);
const [round, setRound] = useState(1);

// UI states
const [loading, setLoading] = useState(true);
const [gameOver, setGameOver] = useState(false);
const [error, setError] = useState(null);

2.3 Initial State Setup
In App.jsx useEffect:

Load best score from localStorage on component mount
Initialize first Pokemon fetch
Set up any cleanup needed


3. Pokemon API Integration
3.1 API Structure Understanding
Pokemon API Response Structure:
javascript{
  id: 35,
  name: "clefairy",
  sprites: {
    front_default: "https://raw.githubusercontent.com/..."
  },
  types: [
    {
      type: {
        name: "fairy"
      }
    }
  ]
}
3.2 API Utility Functions
Create utils/pokemonApi.js:

generateRandomPokemonIds(count) - Generate 12 random IDs (1-898)
fetchPokemonById(id) - Fetch single Pokemon data
fetchMultiplePokemon(ids) - Fetch array of Pokemon
Include proper error handling and loading states

3.3 Data Transformation
Convert API response to game format:
javascript// Transform from API response to:
{
  id: pokemon.id,
  name: pokemon.name,
  image: pokemon.sprites.front_default,
  type: pokemon.types[0].type.name,
  // Add any other needed fields
}

4. Component Implementation
4.1 Scoreboard Component
File: components/Scoreboard.jsx
Props needed:

currentScore (number)
bestScore (number)
round (number)

Structure:
jsx// Three score display items:
// - Current Score: {currentScore}
// - Best Score: {bestScore}  
// - Round: {round}
4.2 Card Component
File: components/Card.jsx
Props needed:

pokemon (object with id, name, image, type)
onClick (function)
isClicked (boolean) - for visual feedback

Features to implement:

Display Pokemon image, name, and type
Handle click events
Add visual feedback for clicks
Responsive sizing

4.3 GameBoard Component
File: components/GameBoard.jsx
Props needed:

pokemon (array)
onCardClick (function)
clickedPokemon (Set) - to determine which cards are clicked

Features:

Grid layout for 12 cards
Map through pokemon array
Pass click handler to each card
Handle empty/loading states

4.4 GameOverModal Component
File: components/GameOverModal.jsx
Props needed:

show (boolean)
finalScore (number)
onRestart (function)

Features:

Modal overlay (show/hide based on prop)
Display final score
"Play Again" button
Click outside to close (optional)

4.5 LoadingSpinner Component
File: components/LoadingSpinner.jsx
Features:

Animated loading indicator
"Loading Cards..." text with animated dots
Show/hide based on loading state


5. Core Game Logic Implementation
5.1 Card Click Handler (in App.jsx)
javascriptconst handleCardClick = (pokemonId) => {
  // 1. Check if already clicked -> game over
  // 2. Add to clicked set
  // 3. Increment score
  // 4. Update best score if needed
  // 5. Check if round complete
  // 6. Shuffle cards after delay
}
Requirements:

Use functional state updates for all setState calls
Handle Set state properly (create new Set, don't mutate)
Include visual feedback timing
Save best score to localStorage

5.2 Card Shuffling Logic
javascriptconst shuffleCards = () => {
  // Create new shuffled array from current pokemon
  // Use Math.random() - 0.5 for shuffle
  // Update pokemon state
}
5.3 Round Progression
javascriptconst nextRound = () => {
  // 1. Increment round
  // 2. Clear clicked pokemon set  
  // 3. Show loading state
  // 4. Fetch new pokemon
  // 5. Hide loading when done
}
5.4 Game Reset Logic
javascriptconst resetGame = () => {
  // Reset all state to initial values
  // Clear clicked pokemon
  // Hide game over modal
  // Fetch new pokemon
}

6. useEffect Hooks Setup
6.1 Initial Setup Effect
javascriptuseEffect(() => {
  // Load best score from localStorage
  // Start first pokemon fetch
}, []); // Empty dependency array - run once
6.2 Best Score Persistence Effect
javascriptuseEffect(() => {
  // Save to localStorage when bestScore changes
}, [bestScore]);
6.3 Round Completion Detection
javascriptuseEffect(() => {
  // Check if clickedPokemon.size === pokemon.length
  // If true, trigger nextRound()
}, [clickedPokemon.size, pokemon.length]);

7. Error Handling & Loading States
7.1 API Error Handling

Wrap all fetch calls in try/catch
Set error state with meaningful messages
Provide fallback UI for failed requests
Include retry mechanisms

7.2 Loading State Management

Show loading spinner during API calls
Hide game board while loading
Update loading text with animated dots
Handle loading state transitions

7.3 Edge Cases

Handle empty API responses
Deal with network failures
Manage localStorage unavailability
Handle rapid clicking (debouncing)


8. Performance Optimization
8.1 useMemo Opportunities
javascript// Memoize shuffled pokemon array
const shuffledPokemon = useMemo(() => 
  [...pokemon].sort(() => Math.random() - 0.5),
  [pokemon, /* shuffle trigger */]
);
8.2 useCallback for Event Handlers
javascript// Memoize click handler to prevent unnecessary re-renders
const handleCardClick = useCallback((pokemonId) => {
  // click logic
}, [clickedPokemon, currentScore, bestScore]);

9. Implementation Order
Phase 1: Basic Structure

Set up component files with basic JSX structure
Implement useState hooks in App.jsx
Create Scoreboard component (easiest first)
Test state updates with dummy data

Phase 2: API Integration

Create pokemonApi.js utility functions
Implement fetchPokemon in App.jsx
Add loading states and error handling
Test with real Pokemon data

Phase 3: Game Logic

Implement handleCardClick function
Add card shuffling logic
Create game over detection
Test complete game flow

Phase 4: Polish & Optimization

Add visual feedback and animations
Implement localStorage persistence
Add performance optimizations
Test edge cases and error scenarios


10. Testing Checklist
10.1 Core Functionality

 Cards display Pokemon data correctly
 Clicking increases score
 Clicking same card twice triggers game over
 Cards shuffle after each click
 Round progresses after clicking all cards
 Game resets properly

10.2 Data Persistence

 Best score saves to localStorage
 Best score loads on page refresh
 Game works without localStorage

10.3 Error Handling

 API failures handled gracefully
 Loading states work correctly
 Network errors don't break game
 Edge cases handled properly