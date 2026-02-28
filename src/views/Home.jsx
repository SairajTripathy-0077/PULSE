import React from 'react';
import { dummySongs } from '../data/songs';
import SongCard from '../components/ui/SongCard';

const Home = () => {
    return (
        <div className="p-8 pb-32 h-full overflow-y-auto relative z-0 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-4">

            {/* Decorative Blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            {/* Greeting Header */}
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8 tracking-tighter">
                Good evening
            </h1>

            {/* Featured Section */}
            <section className="mb-12 relative z-10">
                <div className="flex items-end justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white tracking-wide">Featured Tracks</h2>
                </div>

                {/* Responsive Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {dummySongs.map(song => (
                        <SongCard
                            key={song.id}
                            song={song}
                            queue={dummySongs}
                        />
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Home;
