import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import logo from './Liferay-logo-full-color-2x 2.png';
import user from './user.png';


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
                    
                       
                    
                </li>
            </ul>
            
    <div className="App">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <img src={user}></img>
        </div>
            
            <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3 className='menu-trigger'>Nome</h3>
          <ul>
            <DropdownItem  text = {"Meu Perfil"}/>
            <DropdownItem text = {"Cursos Registrado"}/>
            <DropdownItem text = {"Sair"}/>
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
