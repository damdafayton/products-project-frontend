import { Routes, Route } from 'react-router-dom';

import Products from './features/Products';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header" /> */}
      <Routes>
        <Route path="/" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
