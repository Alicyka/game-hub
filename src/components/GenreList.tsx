import useData from '../hooks/useData';
import type { Genre } from '../entities';

interface Props {
  selectedGenreId?: number;
  onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ selectedGenreId, onSelectGenre }: Props) => {
  const { data: genres, error, isLoading } = useData<Genre>('/genres');

  if (error) return null;
  if (isLoading) return <p>Loading genres...</p>;

  return (
    <ul className="genre-list">
      {genres.map((genre) => (
        <li key={genre.id}>
          <button
            className="genre-button"
            onClick={() => onSelectGenre(genre)}
            style={{
              fontWeight: genre.id === selectedGenreId ? 'bold' : 'normal',
            }}
          >
            {genre.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default GenreList;