import React from 'react';
import { Link } from 'react-router-dom';
import ImagemFundo from 'C:/Users/igorc/Desktop/Liferay/Liferay-Workshop/client/src/pages/loginPage/Background.js';
import Logo from 'C:/Users/igorc/Desktop/Liferay/Liferay-Workshop/public/Logo.js';
import Texto from 'C:/Users/igorc/Desktop/Liferay/Liferay-Workshop/client/src/pages/loginPage/Texto.js';
import Button from 'C:/Users/igorc/Desktop/Liferay/Liferay-Workshop/client/src/pages/loginPage/Botao.js';


const Onboarding = () => {
    return (
        <ImagemFundo>
            <Logo />
            <Texto />
            <div>
                <Link to="/registrar">
                    <Button>Registrar</Button>
                </Link>
                <Link to="/entrar">
                    <Button>Entrar</Button>
                </Link>
            </div>
        </ImagemFundo>
    );
};

export default Onboarding;