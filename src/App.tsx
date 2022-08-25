import React from 'react';
import './App.css';

import Modal from './Modal';

const App: React.FC = function() {
  return (
    <div className="App">
      <Modal>
        <h1 className="quote">&quot;May the light of lights illuminate your path&quot;</h1>
        <p className="quote-source">Father Grigori</p>
      </Modal>
    </div>
  );
};

export default App;
