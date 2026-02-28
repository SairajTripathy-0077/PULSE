import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Library, Plus, Search } from 'lucide-react';
import { usePlaylists } from '../../context/PlaylistContext';

const Sidebar = () => {
    const { playlists, createPlaylist } = usePlaylists();
    const [isCreating, setIsCreating] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    const handleCreate = (e) => {
        e.preventDefault();
        if (newPlaylistName.trim()) {
            createPlaylist(newPlaylistName);
            setNewPlaylistName('');
            setIsCreating(false);
        }
    };

    return (
        <div className="w-64 h-full flex flex-col pt-8 pb-32 text-white/70 relative z-10 px-4">

            {/* Brand / Logo Area */}
            <div className="px-4 mb-10 flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    <Compass size={24} className="text-white animate-pulse" />
                </div>
                <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                    Pulse
                </span>
            </div>

            {/* Main Navigation */}
            <nav className="space-y-2 mb-10 font-medium">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/10 text-white shadow-inner font-bold' : 'hover:bg-white/5 hover:text-white'}`
                    }
                >
                    <Home size={22} className="text-purple-400 group-[.active]:text-purple-400 transition-colors" />
                    Home
                </NavLink>
                <NavLink
                    to="/search"
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/10 text-white shadow-inner font-bold' : 'hover:bg-white/5 hover:text-white'}`
                    }
                >
                    <Search size={22} className="text-pink-400 group-[.active]:text-pink-400 transition-colors" />
                    Search
                </NavLink>
                <NavLink
                    to="/library"
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/10 text-white shadow-inner font-bold' : 'hover:bg-white/5 hover:text-white'}`
                    }
                >
                    <Library size={22} className="text-purple-400 group-[.active]:text-purple-400 transition-colors" />
                    Library
                </NavLink>
            </nav>

            {/* Playlists Section */}
            <div className="flex-1 overflow-y-auto mt-2 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="flex items-center justify-between mb-4 px-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50">Your Playlists</span>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="hover:text-white hover:bg-white/10 p-1 rounded-full transition-all"
                    >
                        <Plus size={18} />
                    </button>
                </div>

                {isCreating && (
                    <form onSubmit={handleCreate} className="mb-4 px-2">
                        <input
                            type="text"
                            autoFocus
                            placeholder="Name it..."
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            onBlur={() => setIsCreating(false)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all shadow-inner"
                        />
                    </form>
                )}

                <ul className="space-y-1 text-sm font-medium">
                    {playlists.map(pl => (
                        <li key={pl.id}>
                            <NavLink
                                to={`/playlist/${pl.id}`}
                                className={({ isActive }) =>
                                    `block px-4 py-2.5 rounded-xl truncate transition-all duration-300 ${isActive ? 'text-white bg-white/10 shadow-inner' : 'hover:text-white hover:bg-white/5'}`
                                }
                            >
                                {pl.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    );
};

export default Sidebar;
