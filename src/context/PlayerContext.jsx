import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const PlayerContext = createContext();
export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [queue, setQueue] = useState([]);
    const [queueIndex, setQueueIndex] = useState(-1);
    const [volume, setVolume] = useState(100); // YouTube uses 0-100
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(null);

    // Grab the audio element on mount and set up strict native listeners
    useEffect(() => {
        const audio = document.getElementById('html5-audio-player');
        if (!audio) return;
        audioRef.current = audio;

        const handleTimeUpdate = () => {
            setProgress(audio.currentTime);
        };

        const handleDurationChange = () => {
            if (audio.duration && !isNaN(audio.duration)) {
                setDuration(audio.duration);
            }
        };

        const handleEnded = () => {
            setIsPlaying(false);
            playNext();
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleDurationChange);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleDurationChange);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, []);

    // Ensure basic UI toggles work (like the main bottom bar play/pause button)
    const togglePlay = () => {
        if (!currentSong || !audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Play error:", e));
        }
    };

    // Handle Volume changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    const playSong = (song, currentQueue = []) => {
        if (!song || !song.audioUrl) return;

        if (currentSong?.id === song.id) {
            // Same song — toggle play/pause directly
            togglePlay();
            return;
        }

        let qIndex = currentQueue.findIndex(s => s.id === song.id);
        if (qIndex === -1 && currentQueue.length === 0) {
            setQueue([song]);
            setQueueIndex(0);
        } else {
            setQueue(currentQueue);
            setQueueIndex(qIndex !== -1 ? qIndex : 0);
        }

        setCurrentSong(song);
        setProgress(0);

        if (audioRef.current) {
            // Point the native audio tag directly at the iTunes preview stream
            audioRef.current.src = song.audioUrl;
            audioRef.current.play().catch(e => console.error("Playback error:", e));
        }
    };

    const playNext = () => {
        if (queue.length === 0) return;
        const nextIndex = (queueIndex + 1) % queue.length;
        setQueueIndex(nextIndex);
        const nextSong = queue[nextIndex];
        playSong(nextSong, queue);
    };

    const playPrevious = () => {
        if (queue.length === 0) return;
        if (progress > 3 && audioRef.current) {
            audioRef.current.currentTime = 0;
            return;
        }
        const prevIndex = queueIndex - 1 < 0 ? queue.length - 1 : queueIndex - 1;
        setQueueIndex(prevIndex);
        const prevSong = queue[prevIndex];
        playSong(prevSong, queue);
    };

    const seekTo = (percentX) => {
        if (!audioRef.current || !duration) return;
        const time = (percentX / 100) * duration;
        audioRef.current.currentTime = time;
        setProgress(time);
    };

    const value = {
        currentSong,
        isPlaying,
        volume,
        progress,
        duration,
        queue,
        playSong,
        togglePlay,
        playNext,
        playPrevious,
        setVolume,
        seekTo,
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
};
