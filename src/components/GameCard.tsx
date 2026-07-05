import type { Game } from '../entities';
import getCroppedImageUrl from '../services/image-url';

interface Props{
  game:Game;
}

const GameCard = ({game}: Props) =>{
  return (
    <div className="game-card">
      <img src={getCroppedImageUrl(game.background_image)} alt={game.name} />
      <div className="game-card-content">
        <h3>{game.name}</h3>
        <p>Rating: {game.rating}⭐</p>
      </div>
    </div>
  );
};

export default GameCard;