import React from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import SheetMusicDisplay from './components/SheetMusicDisplay';
import PianoComponent from './components/Piano';

function App() {
  return (
    <div className="App">
      <Header />
      <SheetMusicDisplay />
      <PianoComponent />
    </div>
  );
}

export default App;
