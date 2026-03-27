import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import axios from 'axios';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
}

const CharacterCard = React.memo(({
  character,
  isSelected,
  onToggle,
}: {
  character: Character;
  isSelected: boolean;
  onToggle: (id: number) => void;
}) => {
  return (
    <div
      onClick={() => onToggle(character.id)}
      className={`p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-200'
      }`}
    >
      <img src={character.image} alt={character.name} className="w-full h-40 object-cover rounded-lg mb-4" />
      <h3 className="font-bold text-slate-900 truncate">{character.name}</h3>
      <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
        <span className={`w-2 h-2 rounded-full ${character.status === 'Alive' ? 'bg-green-500' : 'bg-red-500'}`}></span>
        {character.species} - {character.status}
      </div>
    </div>
  );
});

const CharacterExplorer = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);
  const requestInFlightRef = useRef(false);

  const fetchCharacters = useCallback(async () => {
    if (!hasMoreRef.current || requestInFlightRef.current) {
      return;
    }

    try {
      requestInFlightRef.current = true;
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${pageRef.current}`);
      const results = Array.isArray(response.data?.results) ? response.data.results : [];

      setCharacters((prev) => {
        const seen = new Set(prev.map((character) => character.id));
        const nextCharacters = results.filter((character: Character) => !seen.has(character.id));
        return [...prev, ...nextCharacters];
      });

      pageRef.current += 1;
      hasMoreRef.current = Boolean(response.data?.info?.next);
    } catch (error) {
      console.error('Failed to fetch characters', error);
    } finally {
      requestInFlightRef.current = false;
    }
  }, []);

  const isFetching = useInfiniteScroll(fetchCharacters, containerRef);

  useEffect(() => {
    void fetchCharacters();
  }, [fetchCharacters]);

  const toggleSelection = useCallback((id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  }, []);

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Entity Explorer</h1>
          <p className="text-slate-500">Multiversal data management</p>
        </div>
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
          Selected: {selectedIds.length}
        </div>
      </div>

      <div
        ref={containerRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 h-[calc(100vh-250px)] overflow-y-auto p-2"
      >
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isSelected={selectedIdSet.has(character.id)}
            onToggle={toggleSelection}
          />
        ))}
        {isFetching && (
          <div className="col-span-full py-8 text-center text-slate-400">
            Loading more entities...
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterExplorer;
