import React, { useState, useEffect, useRef, useContext } from 'react';
import SessionContext from '../../api/context/SessionContext';
import supabase from "../../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import './navbar.css';
import logo from './Liferay-logo-full-color-2x 2.png';
import userPlaceholder from './user.png';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({ name: '', avatar_url: '' });
  let menuRef = useRef();
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = session.user;
        if (!user) {
          console.error("Usuário não encontrado na sessão");
          return;
        }

        console.log("Fetching profile for user:", user);

        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id);

        if (error) {
          throw error;
        }

        if (data.length === 0) {
          console.error("Perfil não encontrado");
          return;
        }

        console.log("Profile data:", data[0]);
        setProfile(data[0]);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    fetchProfile();
  }, [session.user]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  const handleProfile = () => {
    navigate("/profile");
  }

  const handleMainEvents = () => {
    navigate("/mainevents");
  }

  return (
    <nav className="nav">
      <div className="nav__brand" onClick={handleMainEvents}>
        <img src={logo} alt="Liferay" />
      </div>

      <div className="nav__search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="nav__search"
        />
      </div>

      <ul className="nav__menu">
        <li className="nav__link"></li>
      </ul>

      <div className="App">
        <div className='menu-container' ref={menuRef}>
          <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
            <img src={profile.avatar_url || userPlaceholder} alt="User Avatar" />
          </div>

          <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
            <h3 className='menu-trigger-Name'>{profile.username || 'Carregando...'}</h3>
            <ul>
              <DropdownItem text={"Meu Perfil"} onClick={handleProfile} />
              <DropdownItem text={"Cursos Registrado"} />
              <DropdownItem text={"Sair"} onClick={handleLogout} />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

function DropdownItem({ text, onClick }) {
  return (
    <li className='dropdownItem' onClick={onClick}>
      <a>{text}</a>
    </li>
  );
}

export default Navbar;
