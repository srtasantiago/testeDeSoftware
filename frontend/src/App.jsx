import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cadastropet from './pages/Cadastropet';
import Home from './pages/Home';
import Listapets from './pages/Listapets';
import Login from './pages/Login';
import Perfilpet from './pages/Perfilpet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastropet" element={<Cadastropet />} />
        <Route path="/listar" element={<Listapets />} />
        <Route path="/perfil/:id" element={<Perfilpet />} /> {/* Importante o :id */}
      </Routes>
    </Router>
  );
}

export default App;
