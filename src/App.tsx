import { useState, useEffect } from 'react';
import apiClient from './services/api-client'; // instanța noastră de Axios
import GameCard from './components/GameCard';
import './App.css';

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

// Forma răspunsului de la RAWG: un obiect cu o proprietate "results" care e un array de Game
interface FetchGamesResponse {
  count: number;
  results: Game[];
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    apiClient
      .get<FetchGamesResponse>('/games')
      .then((res) => {
        setGames(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Game Hub 🎮</h1>

      {error && <p style={{ color: 'red' }}>Eroare: {error}</p>}
      {loading && <p>Se încarcă...</p>}

      <div className="game-grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default App;