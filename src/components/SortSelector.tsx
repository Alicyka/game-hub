interface Props {
  selectedSortOrder?: string;
  onSelectSortOrder: (sortOrder: string) => void;
}

const sortOptions = [
  { value: '', label: 'Relevance' },
  { value: '-added', label: 'Popularity' },
  { value: 'name', label: 'Name' },
  { value: '-released', label: 'Release date' },
  { value: '-rating', label: 'Average rating' },
  { value: '-metacritic', label: 'Metacritic' },
];

const SortSelector = ({ selectedSortOrder, onSelectSortOrder }: Props) => {
  return (
    <select
      className="selector"
      value={selectedSortOrder ?? ''}
      onChange={(e) => onSelectSortOrder(e.target.value)}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SortSelector;