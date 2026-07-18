import { useState } from 'react';
import GameCard from './components/GameCard';
import GenreList from './components/GenreList';
import SearchInput from './components/SearchInput';
import useData from './hooks/useData';
import type { Game, Genre } from './entities';
import './App.css';


interface GameQuery {
  genreId?: number;
  searchText?: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({});

  const { data: games, error, isLoading } = useData<Game>(
    '/games',
    {
      params: {
        genres: gameQuery.genreId,
        search: gameQuery.searchText,
      },
    },
    [gameQuery] 
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Game Hub 🎮</h1>

      <SearchInput
        onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
      />

      <div className="app-container">
        <aside className="sidebar">
          <h2>Genres</h2>
          <GenreList
            selectedGenreId={gameQuery.genreId}
            onSelectGenre={(genre) =>
              setGameQuery({ ...gameQuery, genreId: genre.id })
            }
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