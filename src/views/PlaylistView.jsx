import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaylists } from '../context/PlaylistContext';
import SongRow from '../components/ui/SongRow';
import { Trash2, Music, Play } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const PlaylistView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { playlists, deletePlaylist } = usePlaylists();
    const { playSong } = usePlayer();

    const playlist = playlists.find(p => p.id === id);

    if (!playlist) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white/50 pattern-bg">
                <Music size={64} className="mb-6 opacity-20" />
                <h2 className="text-3xl font-black tracking-tighter text-white mb-2">Playlist not found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="mt-6 px-8 py-3 bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-md text-white rounded-full font-bold transition-all shadow-lg"
                >
                    Return Home
                </button>
            </div>
        );
    }

    const playlistSongs = playlist.songs || [];

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${playlist.name}?`)) {
            deletePlaylist(playlist.id);
            navigate('/');
        }
    };

    const playEntireList = () => {
        if (playlistSongs.length > 0) {
            playSong(playlistSongs[0], playlistSongs);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto pb-32 relative scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-4">

            {/* Decorative Blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none -z-10" />

            {/* Header Banner - Glass Morphism */}
            <div className="p-8 flex items-end gap-8 relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="w-56 h-56 bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center rounded-3xl border border-white/20 overflow-hidden relative group">
                    {playlistSongs.length > 0 ? (
                        <img
                            src={playlistSongs[0].albumArtUrl}
                            alt="Playlist Cover"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                    ) : (
                        <Music size={80} className="text-white/20" />
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex flex-col gap-2 relative w-full pt-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Playlist</span>
                    <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-tighter mb-4 truncate pr-16 pb-2">
                        {playlist.name}
                    </h1>
                    <div className="flex items-center gap-3 text-sm text-white/60 font-medium">
                        <span className="bg-white/10 px-3 py-1 rounded-full">{playlistSongs.length} songs</span>
                        <span className="bg-white/10 px-3 py-1 rounded-full">Created {new Date(playlist.createdAt).toLocaleDateString()}</span>
                    </div>

                    <button
                        onClick={handleDelete}
                        title="Delete Playlist"
                        className="absolute top-0 right-0 text-white/40 hover:text-red-400 transition-all p-3 rounded-full hover:bg-red-500/10"
                    >
                        <Trash2 size={24} />
                    </button>
                </div>
            </div>

            {/* Action Bar */}
            <div className="px-8 py-8 relative z-10">
                <button
                    onClick={playEntireList}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-all focus:outline-none"
                >
                    <Play size={32} fill="currentColor" className="ml-1.5" />
                </button>
            </div>

            {/* Song List */}
            <div className="px-8 relative z-10">
                <div className="border-b border-white/10 pb-3 mb-6 flex text-xs font-bold uppercase tracking-widest text-white/40 px-4">
                    <div className="w-12 text-center">#</div>
                    <div className="w-12 mx-4"></div> {/* space for album art */}
                    <div className="flex-1">Title</div>
                    <div className="w-20 hidden sm:block text-right pr-4">Duration</div>
                    <div className="w-12"></div>
                </div>

                {playlistSongs.length === 0 ? (
                    <div className="text-center py-20 text-white/30 flex flex-col items-center">
                        <Music size={64} className="mb-6 opacity-20" />
                        <h3 className="text-2xl font-black text-white mb-3">It's a bit empty here</h3>
                        <p className="text-lg">Let's find some songs for your playlist.</p>
                        <button
                            onClick={() => navigate('/search')}
                            className="mt-8 px-8 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 text-white font-bold transition-all"
                        >
                            Search for Music
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1">
                        {playlistSongs.map((song, index) => (
                            <SongRow
                                key={song.id}
                                song={song}
                                index={index}
                                queue={playlistSongs}
                                playlistId={playlist.id}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default PlaylistView;
