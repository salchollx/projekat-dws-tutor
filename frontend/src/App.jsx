// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar.jsx';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <Router>
      {/* Navbar je van Routes jer želimo da se vidi na svakoj stranici */}
      <NavBar />
      
      <Routes>
        {/* Definišemo da se na putanji "/" prikazuje Home komponenta */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        
        {/* Kasnije ćeš ovdje dodati npr:
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<Login />} /> 
        */}
      </Routes>
    </Router>
  );
}

export default App;
