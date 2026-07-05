import useData from '../hooks/useData';
import type { Genre } from '../entities';

const GenreList = () => {
  const { data: genres, error, isLoading } = useData<Genre>('/genres');

  if (error) return null;
  if (isLoading) return <p>Loading genres...</p>;

  return (
    <ul className="genre-list">
      {genres.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  );
};

export default GenreList;