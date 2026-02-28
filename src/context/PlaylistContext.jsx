import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPlaylists, createPlaylist, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist } from '../services/storage';

const PlaylistContext = createContext();

export const usePlaylists = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        setPlaylists(getPlaylists());
    }, []);

    const handleCreatePlaylist = (name) => {
        if (!name.trim()) return;
        createPlaylist(name);
        setPlaylists(getPlaylists());
    };

    const handleDeletePlaylist = (id) => {
        deletePlaylist(id);
        setPlaylists(getPlaylists());
    };

    // V2 Storage expects the full song object
    const handleAddSong = (playlistId, songObject) => {
        // If we only get an ID from somewhere accidentally, log it
        if (typeof songObject === 'string') {
            console.warn("handleAddSong requires a full song object, not an ID string.", songObject);
            return;
        }
        addSongToPlaylist(playlistId, songObject);
        setPlaylists(getPlaylists());
    };

    const handleRemoveSong = (playlistId, songId) => {
        removeSongFromPlaylist(playlistId, songId);
        setPlaylists(getPlaylists());
    };

    const value = {
        playlists,
        createPlaylist: handleCreatePlaylist,
        deletePlaylist: handleDeletePlaylist,
        addSong: handleAddSong,
        removeSong: handleRemoveSong,
    };

    return (
        <PlaylistContext.Provider value={value}>
            {children}
        </PlaylistContext.Provider>
    );
};
