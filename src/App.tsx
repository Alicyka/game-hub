import { useState, useEffect } from 'react';
import GameCard from './components/GameCard';
import apiClient from './services/api-client'; // Import our custom API client
import './App.css';

// Interface defining the structure of a single game object
interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

// Interface defining the expected shape of the RAWG API response
interface FetchGamesResponse {
  count: number;
  results: Game[];
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch games data using the Axios instance
    apiClient.get<FetchGamesResponse>('/games')
      .then(res => {
        setGames(res.data.results); // Save the fetched games into state
      })
      .catch(err => {
        setError(err.message); // Catch and store any potential errors
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Game Hub 🎮</h1>
      
      {/* Conditionally render the error message if the API request fails */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      <div className="game-grid">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default App;