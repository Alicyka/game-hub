import { useState, useEffect } from 'react';
import GameCard from './components/GameCard';
import GenreList from './components/GenreList'; // Import the new component
import apiClient from './services/api-client';
import './App.css';

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  // State to track if the data is currently being fetched
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Start the loading process before making the request
    setLoading(true);
    
    apiClient.get<FetchGamesResponse>('/games')
      .then(res => {
        setGames(res.data.results);
        // Stop loading once data arrives successfully
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        // Stop loading even if there is an error
        setLoading(false);
      });
  }, []);

 return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Game Hub 🎮</h1>
      
      {/* App wrapper for layout positioning */}
      <div className="app-container">
        
        {/* Sidebar section */}
        <aside className="sidebar">
          <h2>Genres</h2>
          <GenreList />
        </aside>

        {/* Main content section */}
        <main className="main-content">
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {isLoading && <p>Loading games...</p>}
          
          <div className="game-grid">
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </main>
        
      </div>
    </div>
  );
}

export default App;