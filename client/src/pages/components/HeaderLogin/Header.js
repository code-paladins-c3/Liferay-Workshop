// Header.js
import React from 'react';
import logo from '../assets/images/liferaylogo.png';

const Header = () => {
  return (
    <header className="u-clearfix u-header u-header" id="sec-f329">
      <div className="u-clearfix u-sheet u-sheet-1">
        {/* Conteúdo do cabeçalho */}
        <div className="u-logo-image u-logo-image-1">
          <img src={logo} alt="logo" />
        </div>
        <nav className="u-menu u-menu-dropdown u-offcanvas u-menu-1">
          {/* Aqui você pode adicionar o menu, se necessário */}
        </nav>
      </div>
    </header>
  );
}

export default Header;
