import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { usePlaylists } from '../../context/PlaylistContext';

const PlaylistContextMenu = ({ song, playlistId = null, onMenuChange }) => {
    const [showMenu, setShowMenu] = useState(false);
    const { playlists, addSong, removeSong } = usePlaylists();
    const menuRef = useRef(null);

    // Click outside listener
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
                if (onMenuChange) onMenuChange(false);
            }
        };
        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.addEventListener('mousedown', handleClickOutside);
        };
    }, [showMenu]);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    const newState = !showMenu;
                    setShowMenu(newState);
                    if (onMenuChange) onMenuChange(newState);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all focus:outline-none"
            >
                <MoreHorizontal size={20} />
            </button>

            {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a1128]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] py-2 z-[100] text-sm overflow-hidden">

                    {playlistId && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeSong(playlistId, song.id);
                                setShowMenu(false);
                                if (onMenuChange) onMenuChange(false);
                            }}
                            className="w-full text-left px-4 py-2.5 text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-colors"
                        >
                            <Trash2 size={16} /> Remove from this playlist
                        </button>
                    )}

                    {!playlistId && (
                        <>
                            <div className="px-4 py-2 text-xs font-bold text-white/40 uppercase tracking-widest border-b border-white/10 mb-1">
                                Add to Playlist
                            </div>

                            <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
                                {playlists.length === 0 ? (
                                    <div className="px-4 py-3 text-white/40 italic">No playlists created yet.</div>
                                ) : (
                                    playlists.map((pl) => (
                                        <button
                                            key={pl.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addSong(pl.id, song);
                                                setShowMenu(false);
                                                if (onMenuChange) onMenuChange(false);
                                            }}
                                            className="w-full text-left px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 flex items-center gap-3 transition-colors"
                                        >
                                            <Plus size={16} className="text-purple-400" />
                                            <span className="truncate">{pl.name}</span>
                                        </button>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default PlaylistContextMenu;
