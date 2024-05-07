import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Inicio from './pages/inicio';
import Visita from './components/visitas/visita';
import Anecdotas from './components/anecdotas/anecdotas';
import AnecdotaByID from './components/anecdotas/anecdotas';
import Galeria from './components/galeria/galeria';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inicio" element={token ? <Inicio /> : <Navigate to="/login" />} />
        <Route path="/visitas" element={<Visita />} />
        <Route path="/anecdotas" element={<Anecdotas />} />
        <Route path="/anecdota/:id" element={<AnecdotaByID />} />
        <Route path="/galeria" element={<Galeria />} />
      </Routes>
    </div>
  );
}

export default App;
