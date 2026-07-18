import useData from '../hooks/useData';
import type { Platform } from '../entities';

interface Props {
  selectedPlatformId?: number;
  onSelectPlatform: (platformId: number | undefined) => void;
}

const PlatformSelector = ({ selectedPlatformId, onSelectPlatform }: Props) => {
  const { data: platforms, error } = useData<Platform>('/platforms/lists/parents');

  if (error) return null;

  return (
    <select
      className="selector"
      value={selectedPlatformId ?? ''}
      onChange={(e) =>
        onSelectPlatform(e.target.value ? Number(e.target.value) : undefined)
      }
    >
      <option value="">All Platforms</option>
      {platforms.map((platform) => (
        <option key={platform.id} value={platform.id}>
          {platform.name}
        </option>
      ))}
    </select>
  );
};

export default PlatformSelector;