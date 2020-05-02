import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CharboxComponent } from './ui/charbox.component';

function App() {
  return (
    <div className="ma5">

    <CharboxComponent type='char' char='A'></CharboxComponent>

    </div>
  );
}

export default App;
