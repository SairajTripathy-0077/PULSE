import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import PlayerBar from './components/layout/PlayerBar';
import Home from './views/Home';
import Search from './views/Search';
import PlaylistView from './views/PlaylistView';
import Library from './views/Library';

const App = () => {

  return (
    <Router>
      <div className="flex h-screen bg-gradient-to-br from-[#1A0B2E] via-[#11071F] to-[#0A0512] text-white overflow-hidden font-sans select-none">

        {/* Glassmorphism Background Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[100px] pointer-events-none" />

        {/* Hidden HTML5 Audio Player */}
        <audio id="html5-audio-player" autoPlay crossOrigin="anonymous"></audio>

        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 z-10 relative bg-white/5 backdrop-blur-3xl m-4 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/playlist/:id" element={<PlaylistView />} />
          </Routes>
        </div>

        {/* Global Player Bar */}
        <PlayerBar />
      </div>
    </Router>
  );
};

export default App;
