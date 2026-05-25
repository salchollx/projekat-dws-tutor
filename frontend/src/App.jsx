// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {NavBar} from './components/NavBar.jsx';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import About from './pages/About.jsx';       // Importuj About
import Contact from './pages/Contact.jsx';   // Importuj Contact
import NotFound from './pages/NotFound.jsx'; // Importuj NotFound
import SearchPage from './pages/SearchPage.jsx';
import TutorProfile from './pages/TutorProfile.jsx';

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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/tutor/:id" element={<TutorProfile />} />
        <Route path="*" element={<NotFound />} />
        {/* Kasnije ćeš ovdje dodati npr:
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<Login />} /> 
        */}
      </Routes>
    </Router>
  );
}

export default App;
