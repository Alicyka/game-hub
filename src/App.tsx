import { useState } from 'react';
import GameCard from './components/GameCard';
import GenreList from './components/GenreList';
import SearchInput from './components/SearchInput';
import PlatformSelector from './components/PlatformSelector';
import SortSelector from './components/SortSelector';
import useData from './hooks/useData';
import type { Game } from './entities';
import './App.css';

interface GameQuery {
  genreId?: number;
  platformId?: number;
  sortOrder?: string;
  searchText?: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({});

  const { data: games, error, isLoading } = useData<Game>(
    '/games',
    {
      params: {
        genres: gameQuery.genreId,
        parent_platforms: gameQuery.platformId,
        ordering: gameQuery.sortOrder,
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
          <div className="toolbar">
            <PlatformSelector
              selectedPlatformId={gameQuery.platformId}
              onSelectPlatform={(platformId) =>
                setGameQuery({ ...gameQuery, platformId })
              }
            />
            <SortSelector
              selectedSortOrder={gameQuery.sortOrder}
              onSelectSortOrder={(sortOrder) =>
                setGameQuery({ ...gameQuery, sortOrder })
              }
            />
          </div>

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