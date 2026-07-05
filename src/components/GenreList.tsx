// src/components/GenreList.tsx
import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';

// Define the shape of a single genre from the API
interface Genre {
  id: number;
  name: string;
  image_background: string;
}

// Define the shape of the API response for genres
interface FetchGenresResponse {
  count: number;
  results: Genre[];
}

const GenreList = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // Fetch genres using the exact same client, but a different endpoint ('/genres')
    apiClient.get<FetchGenresResponse>('/genres')
      .then(res => {
        setGenres(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Early return: If there's an error, don't crash the UI, just return nothing
  if (error) return null;
  
  // Early return: Show a simple text while fetching
  if (isLoading) return <p>Loading genres...</p>;

  return (
    <ul className="genre-list">
      {genres.map(genre => (
        <li key={genre.id}>
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default GenreList;