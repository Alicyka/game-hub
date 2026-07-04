import { useState, useEffect } from 'react';
import './App.css';

// TypeScript: Definim cum arată un joc
interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

// Data from Steam
const mockGames: Game[] = [
  {
    id: 1,
    name: "The Witcher 3: Wild Hunt",
    background_image: "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg",
    rating: 4.92
  },
  {
    id: 2,
    name: "Grand Theft Auto V",
    background_image: "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg",
    rating: 4.47
  },
  {
    id: 3,
    name: "Portal 2",
    background_image: "https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg",
    rating: 4.61
  },
  {
    id: 4,
    name: "Tomb Raider",
    background_image: "https://cdn.akamai.steamstatic.com/steam/apps/203160/header.jpg",
    rating: 4.05
  }
];

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // În loc să așteptăm după RAWG, simulăm că am primit datele instant
    setGames(mockGames);

    // Am comentat codul real. Când RAWG își revine, ștergi setGames(mockGames) 
    // și decomentezi blocul de mai jos:
    
    /*
    const apiKey = import.meta.env.VITE_RAWG_API_KEY;
    fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
      .then(res => res.json())
      .then(data => setGames(data.results))
      .catch(err => setError(err.message));
    */
  }, []);

return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Game Hub 🎮</h1>
      
      {error && <p style={{ color: 'red' }}>Eroare: {error}</p>}
      
      {/* Am înlocuit ul/li cu div-uri și am adăugat clase CSS */}
      <div className="game-grid">
        {games.map(game => (
          <div key={game.id} className="game-card">
            <img src={game.background_image} alt={game.name} />
            <div className="game-card-content">
              <h3>{game.name}</h3>
              <p>Rating: {game.rating} ⭐</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;