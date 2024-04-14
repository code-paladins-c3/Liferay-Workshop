import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import logo from './Liferay-logo-full-color-2x 2.png';

import user from './user.png';
import edit from './edit.png';
import settings from './settings.png';
import help from './question.png';
import logout from './log-out.png';

function Navbar () {
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
                console.log(menuRef.current);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    return (
       <nav className="nav">
            <a href="#" className="nav__brand">
            <img src={logo} alt="Liferay" />
            </a>

            <div className="nav__search-container">
           {/* <span className="nav__search-icon">🔍</span> */}
                <input 
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="nav__search"
                />
                 
            </div>
            <ul className="nav__menu">
                <li className="nav__link">
                    <a href="#" className="nav__link">
                        Home
                    </a>
                </li>
            </ul>
            
    <div className="App">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <img src={user}></img>
        </div>
            
            <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>Nome<br/><span>Visitante</span></h3>
          <ul>
            <DropdownItem img = {user} text = {"Meu Perfil"}/>
            <DropdownItem img = {edit} text = {"Editar Perfil"}/>
            <DropdownItem img = {settings} text = {"Configurações"}/>
            <DropdownItem img = {help} text = {"Ajuda"}/>
            <DropdownItem img = {logout} text = {"Sair"}/>
          </ul>
        </div>
        </div>
        </div>
       </nav>
    );
}
function DropdownItem(props){
    return(
      <li className = 'dropdownItem'>
        <img src={props.img}></img>
        <a> {props.text} </a>
      </li>
    );
  }

export default Navbar;
