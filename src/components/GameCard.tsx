// src/components/GameCard.tsx

// Definim ce primește componenta noastră (exact ca parametrii unei funcții)
interface Props {
  game: {
    name: string;
    background_image: string;
    rating: number;
  };
}

const GameCard = ({ game }: Props) => {
  return (
    <div className="game-card">
      <img src={game.background_image} alt={game.name} />
      <div className="game-card-content">
        <h3>{game.name}</h3>
        <p>Rating: {game.rating} ⭐</p>
      </div>
    </div>
  );
};

export default GameCard;