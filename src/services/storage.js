/**
 * Service to manage saving and loading playlists from Local Storage.
 * Keys are prefixed to avoid collisions.
 */

const PLAYLISTS_KEY = 'music_player_playlists_v2'; // Bumped version to avoid crashing on old string-based ID arrays

export const getPlaylists = () => {
    try {
        const data = localStorage.getItem(PLAYLISTS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Failed to parse playlists from local storage", error);
        return [];
    }
};

export const savePlaylists = (playlists) => {
    try {
        localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists));
    } catch (error) {
        console.error("Failed to save playlists to local storage", error);
    }
};

/**
 * Playlist object structure changed for v2 API support:
 * {
 *   id: string,
 *   name: string,
 *   createdAt: number,
 *   songs: object[]  <-- Now stores FULL song objects instead of just IDs so YouTube metadata persists
 * }
 */
export const createPlaylist = (name) => {
    const playlists = getPlaylists();
    const newPlaylist = {
        id: `pl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        name,
        createdAt: Date.now(),
        songs: [],
    };

    playlists.push(newPlaylist);
    savePlaylists(playlists);
    return newPlaylist;
};

export const deletePlaylist = (id) => {
    const playlists = getPlaylists();
    const filtered = playlists.filter(p => p.id !== id);
    savePlaylists(filtered);
    return filtered;
};

export const addSongToPlaylist = (playlistId, songObject) => {
    const playlists = getPlaylists();
    let updatedPlaylist = null;

    const updatedPlaylists = playlists.map(p => {
        if (p.id === playlistId && !p.songs.some(s => s.id === songObject.id)) {
            updatedPlaylist = { ...p, songs: [...p.songs, songObject] };
            return updatedPlaylist;
        }
        return p;
    });

    if (updatedPlaylist) {
        savePlaylists(updatedPlaylists);
    }
    return updatedPlaylists;
};

export const removeSongFromPlaylist = (playlistId, songId) => {
    const playlists = getPlaylists();
    const updatedPlaylists = playlists.map(p => {
        if (p.id === playlistId) {
            return { ...p, songs: p.songs.filter(s => s.id !== songId) };
        }
        return p;
    });

    savePlaylists(updatedPlaylists);
    return updatedPlaylists;
};
