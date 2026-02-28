import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import PlaylistContextMenu from './PlaylistContextMenu';

const SongCard = ({ song, queue }) => {
    const { currentSong, isPlaying, togglePlay, playSong } = usePlayer();
    const isCurrentlyPlaying = currentSong?.id === song.id;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handlePlayClick = (e) => {
        e.stopPropagation();
        if (isCurrentlyPlaying) {
            togglePlay();
        } else {
            playSong(song, queue);
        }
    };

    return (
        <div className={`bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-3xl transition-all duration-300 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 group cursor-pointer flex flex-col relative ${isMenuOpen ? 'z-[100]' : 'hover:z-50'}`}>

            {/* Decorative Gradient Background (visible on hover) */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Album Art Container */}
            <div className="relative mb-5 pb-[100%] rounded-2xl overflow-hidden shadow-xl z-10 w-full bg-black">
                <img
                    src={song.albumArtUrl}
                    alt={song.title}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${isCurrentlyPlaying ? 'scale-105' : ''}`}
                    loading="lazy"
                />

                {/* Play Button Overlay */}
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isCurrentlyPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <button
                        onClick={handlePlayClick}
                        className={`w-14 h-14 flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white/30`}
                    >
                        {isCurrentlyPlaying && isPlaying ? (
                            <Pause size={28} fill="currentColor" />
                        ) : (
                            <Play size={28} fill="currentColor" className="ml-1" />
                        )}
                    </button>
                </div>
            </div>

            {/* Meta Info & Playlist Menu */}
            <div className="flex items-start justify-between z-10 gap-2">
                <div className="overflow-hidden flex-1">
                    <h3 className={`font-black truncate mb-0.5 text-base tracking-wide ${isCurrentlyPlaying ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400' : 'text-white'}`}>
                        {song.title}
                    </h3>
                    <p className="text-white/60 text-sm truncate font-medium">{song.artist}</p>
                </div>

                {/* Universal Playlist Context Menu */}
                <div className="flex-shrink-0">
                    <PlaylistContextMenu song={song} onMenuChange={setIsMenuOpen} />
                </div>
            </div>

            {isCurrentlyPlaying && (
                <div className="absolute top-6 left-6 w-3 h-3 bg-pink-500 rounded-full animate-ping z-20 shadow-[0_0_10px_#EC4899]" />
            )}
        </div>
    );
};

export default SongCard;
