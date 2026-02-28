import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import PlaylistContextMenu from './PlaylistContextMenu';

const SongRow = ({ song, index, queue, playlistId = null }) => {
    const { currentSong, isPlaying, togglePlay, playSong } = usePlayer();
    const isCurrentlyPlaying = currentSong?.id === song.id;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handlePlayClick = () => {
        if (isCurrentlyPlaying) {
            togglePlay();
        } else {
            playSong(song, queue);
        }
    };

    const formatDuration = (seconds) => {
        if (!seconds) return '--:--';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div
            className={`group flex items-center px-4 py-3 mb-2 rounded-2xl transition-all duration-300 border border-transparent relative ${isCurrentlyPlaying ? 'bg-white/10 border-white/20 shadow-[0_5px_15px_rgba(0,0,0,0.2)]' : 'hover:bg-white/5 hover:border-white/10'
                } ${isMenuOpen ? 'z-[100]' : 'hover:z-50'}`}
        >
            {/* Index / Play Button */}
            <div className="w-12 text-center text-white/50 relative">
                <button
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    onClick={handlePlayClick}
                >
                    {isCurrentlyPlaying && isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                </button>
                <span className="block group-hover:opacity-0 transition-opacity font-mono text-sm font-bold">
                    {isCurrentlyPlaying ? (
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse mx-auto shadow-[0_0_10px_#EC4899]" />
                    ) : (
                        (index + 1 < 10 ? '0' : '') + (index + 1)
                    )}
                </span>
            </div>

            {/* Album Art (Optional, mainly for search/home, looks good in lists too) */}
            <img
                src={song.albumArtUrl}
                alt=""
                className={`w-12 h-12 object-cover rounded-xl shadow-md transition-transform duration-500 mx-4 ${isCurrentlyPlaying ? 'scale-110' : ''}`}
                loading="lazy"
            />

            {/* Title & Artist */}
            <div className="flex-1 flex flex-col justify-center overflow-hidden">
                <span className={`truncate text-base font-bold tracking-wide ${isCurrentlyPlaying ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400' : 'text-white'}`}>
                    {song.title}
                </span>
                <span className="truncate text-sm text-white/60 font-medium">
                    {song.artist}
                </span>
            </div>

            {/* Duration */}
            <div className="text-white/50 text-sm hidden sm:block w-20 text-right font-mono">
                {formatDuration(song.duration)}
            </div>

            {/* Unified Context Menu */}
            <div className="w-12 flex justify-end ml-4">
                <PlaylistContextMenu song={song} playlistId={playlistId} onMenuChange={setIsMenuOpen} />
            </div>
        </div>
    );
};

export default SongRow;
