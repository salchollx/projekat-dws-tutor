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
import MyProfile from './pages/MyProfile.jsx';
import { ToastContainer } from 'react-toastify';       //Toasty
import 'react-toastify/dist/ReactToastify.css';

const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

function App() {
  return (
    <Router>
      {/* Navbar je van Routes jer želimo da se vidi na svakoj stranici */}
      <NavBar />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Definišemo da se na putanji "/" prikazuje Home komponenta */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<MyProfile />} />
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
