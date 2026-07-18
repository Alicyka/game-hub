import { useState, useEffect } from 'react';

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const [text, setText] = useState('');

  //Debounce search input to avoid excessive API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(text);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [text]);

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search games..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};

export default SearchInput;