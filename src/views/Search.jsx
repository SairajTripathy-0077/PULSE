import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Loader2, Music } from 'lucide-react';
import { searchTracks } from '../services/api';
import SongCard from '../components/ui/SongCard';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Debounced Search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length > 2) {
                setIsLoading(true);
                setHasSearched(true);
                const data = await searchTracks(query);
                setResults(data);
                setIsLoading(false);
            } else if (query.trim().length === 0) {
                setResults([]);
                setHasSearched(false);
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="p-8 pb-32 h-full flex flex-col overflow-hidden relative">

            {/* Decorative Blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            {/* Search Header */}
            <div className="mb-8 relative z-10 w-full max-w-2xl mx-auto">
                <h1 className="text-4xl font-black text-white mb-6 tracking-tighter text-center">
                    What do you want to listen to?
                </h1>

                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-white/50 group-focus-within:text-pink-400 transition-colors">
                        <SearchIcon size={24} />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for songs, artists, or podcasts..."
                        className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full py-5 pl-16 pr-8 text-lg focus:outline-none focus:border-pink-400 focus:bg-white/20 transition-all shadow-2xl placeholder-white/40"
                        autoFocus
                    />
                    {isLoading && (
                        <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none text-pink-400">
                            <Loader2 size={24} className="animate-spin" />
                        </div>
                    )}
                </div>
            </div>

            {/* Results Section */}
            <div className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto pb-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-4">

                {!hasSearched && query.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-white/30 pt-20">
                        <Music size={80} className="mb-6 opacity-20" />
                        <p className="text-xl font-medium tracking-wide">Search for a track to begin</p>
                    </div>
                )}

                {hasSearched && !isLoading && results.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-white/50 pt-20 text-center">
                        <h3 className="text-2xl font-bold mb-2">No results found for "{query}"</h3>
                        <p className="font-medium">Please make sure your words are spelled correctly or use less or different keywords.</p>
                    </div>
                )}

                {results.length > 0 && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {results.map(song => (
                            <SongCard
                                key={song.id}
                                song={song}
                                queue={results}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default Search;
