import React from 'react';
import { NavLink } from 'react-router-dom';
import { usePlaylists } from '../context/PlaylistContext';
import { Library as LibraryIcon, Music } from 'lucide-react';

const Library = () => {
    const { playlists } = usePlaylists();

    return (
        <div className="p-8 pb-32 h-full flex flex-col overflow-y-auto relative z-0 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-4">

            {/* Decorative Blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            {/* Header */}
            <div className="mb-10 relative z-10">
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2 tracking-tighter flex items-center gap-3">
                    <LibraryIcon size={36} className="text-purple-400" />
                    Your Library
                </h1>
                <p className="text-white/60 font-medium text-lg">
                    {playlists.length} {playlists.length === 1 ? 'Playlist' : 'Playlists'}
                </p>
            </div>

            {/* Playlists Grid */}
            {playlists.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-white/50 text-center mt-20">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <Music size={40} className="text-white/30" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-white">It's quiet in here...</h2>
                    <p className="font-medium text-lg text-white/60 max-w-md">
                        Create your first playlist from the sidebar by clicking the <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded-md inline-block">+</span> icon.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 relative z-10 mt-4">
                    {playlists.map((playlist) => (
                        <NavLink
                            key={playlist.id}
                            to={`/playlist/${playlist.id}`}
                            className="group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl p-5 transition-all duration-300 flex flex-col gap-4 shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="w-full aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center shadow-inner group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                                <Music size={48} className="text-white/40 group-hover:text-white/70 group-hover:scale-110 transition-all duration-300" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg truncate group-hover:text-pink-300 transition-colors">
                                    {playlist.name}
                                </h3>
                                <p className="text-white/50 text-sm font-medium mt-1">
                                    {playlist.songs?.length || 0} {(playlist.songs?.length || 0) === 1 ? 'track' : 'tracks'}
                                </p>
                            </div>
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Library;
