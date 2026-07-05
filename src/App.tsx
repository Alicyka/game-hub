import { useState } from 'react';
import GameCard from './components/GameCard';
import GenreList from './components/GenreList';
import useData from './hooks/useData';
import type { Game, Genre } from './entities';
import './App.css';

function App() {
  
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  const { data: games, error, isLoading } = useData<Game>(
    '/games',
    { params: { genres: selectedGenre?.id } }, 
    [selectedGenre?.id]                          
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Game Hub 🎮</h1>

      <div className="app-container">
        <aside className="sidebar">
          <h2>Genres</h2>
          <GenreList
            selectedGenreId={selectedGenre?.id}
            onSelectGenre={(genre) => setSelectedGenre(genre)}
          />
        </aside>

        <main className="main-content">
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {isLoading && <p>Loading games...</p>}

          <div className="game-grid">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;