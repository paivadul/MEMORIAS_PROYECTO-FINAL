import React from 'react';
import { Routes, Route} from 'react-router-dom';
// import Inicio from './pages/inicio';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/inicio" element={token ? <Inicio /> : <Navigate to="/login" />} /> */}
      </Routes>
    </div>
  );
}

export default App;
