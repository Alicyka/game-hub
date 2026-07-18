import type { Game } from '../entities';
import getCroppedImageUrl from '../services/image-url';
import PlatformIconList from './PlatformIconList';
import CriticScore from './CriticScore';

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <div className="game-card">
      <img src={getCroppedImageUrl(game.background_image)} alt={game.name} />
      <div className="game-card-content">
        <div className="card-top-row">
          <PlatformIconList
            platforms={game.parent_platforms?.map((p) => p.platform) ?? []}
          />
          <CriticScore score={game.metacritic} />
        </div>
        <h3>{game.name}</h3>
      </div>
    </div>
  );
};

export default GameCard;