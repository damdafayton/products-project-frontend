import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import { Alert } from '@mui/material';

import Products from './features/Products';
import ProductNew from './features/ProductNew';
import './App.css';
import { utils } from './helpers';

function App() {
  const [alert, setAlert] = useState(undefined);

  const handleAlertClose = () => setAlert(undefined);

  return (
    <div className="App px-2 px-md-5 pt-4 pb-2">
      {alert && (
        <Alert
          className="mb-2"
          onClose={handleAlertClose}
          severity={alert.status}
        >
          {utils.sterilizeMySQLErrorMessages(alert.message)}
        </Alert>
      )}
      <Routes>
        <Route path="/" element={<Products setAlert={setAlert} />} />
        <Route
          path="/new_product"
          element={<ProductNew setAlert={setAlert} />}
        />
      </Routes>
    </div>
  );
}

export default App;
