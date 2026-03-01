import React from 'react';
import { usePlayer } from '../../context/PlayerContext';
import {
    Play, Pause, SkipBack, SkipForward,
    Volume2, VolumeX
} from 'lucide-react';

const PlayerBar = () => {
    const {
        currentSong, isPlaying, togglePlay, playNext, playPrevious,
        progress, duration, volume, setVolume, seekTo
    } = usePlayer();

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleProgressChange = (e) => {
        seekTo(Number(e.target.value));
    };

    const handleVolumeChange = (e) => {
        setVolume(Number(e.target.value));
    };

    if (!currentSong) return null;

    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-6 flex items-center justify-between z-50">

            {/* Current Song Info */}
            <div className="flex items-center gap-4 w-1/3 min-w-[200px]">
                <img
                    src={currentSong.albumArtUrl}
                    alt={currentSong.title}
                    className="w-14 h-14 rounded-xl object-cover shadow-lg border border-white/10"
                />
                <div className="overflow-hidden">
                    <h4 className="text-white text-sm font-bold truncate tracking-wide">{currentSong.title}</h4>
                    <p className="text-white/60 text-xs truncate mt-0.5">{currentSong.artist}</p>
                </div>
            </div>

            {/* Player Controls */}
            <div className="flex flex-col items-center justify-center max-w-xl w-full">
                <div className="flex items-center gap-6 mb-2">
                    <button
                        onClick={playPrevious}
                        className="text-white/60 hover:text-white hover:scale-110 transition-all drop-shadow-md"
                    >
                        <SkipBack size={22} fill="currentColor" />
                    </button>

                    <button
                        onClick={togglePlay}
                        className="w-12 h-12 flex items-center justify-center bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-full hover:scale-110 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
                    >
                        {isPlaying ? (
                            <Pause size={24} fill="currentColor" />
                        ) : (
                            <Play size={24} fill="currentColor" className="ml-1" />
                        )}
                    </button>

                    <button
                        onClick={playNext}
                        className="text-white/60 hover:text-white hover:scale-110 transition-all drop-shadow-md"
                    >
                        <SkipForward size={22} fill="currentColor" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-3 w-full max-w-[500px]">
                    <span className="text-xs font-mono text-white/50 w-10 text-right">
                        {formatTime(progress)}
                    </span>
                    <div className="group w-full flex items-center h-4 relative cursor-pointer">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={duration ? (progress / duration) * 100 : 0}
                            onChange={handleProgressChange}
                            className="absolute z-10 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden flex items-center group-hover:bg-white/20 transition-colors shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-purple-400 to-pink-400 relative"
                                style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </div>
                    <span className="text-xs font-mono text-white/50 w-10">
                        {formatTime(duration)}
                    </span>
                </div>
            </div>

            {/* Right Controls (Volume) */}
            <div className="flex items-center justify-end gap-3 w-1/3 min-w-[150px]">
                <div className="flex items-center gap-3 group relative">
                    <button
                        onClick={() => setVolume(volume === 0 ? 100 : 0)}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>

                    <div className="w-24 h-4 flex items-center relative cursor-pointer">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="absolute z-10 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden flex items-center group-hover:bg-white/20 transition-colors shadow-inner">
                            <div
                                className="h-full bg-white transition-colors"
                                style={{ width: `${volume}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PlayerBar;
