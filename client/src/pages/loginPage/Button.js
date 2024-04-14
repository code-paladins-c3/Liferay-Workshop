import React from 'react';
import styled from 'styled-components';

const Botao = styled.button`
    // Estilos do botão
`;

const Button = ({ children, onClick }) => {
    return <Botao onClick={onClick}>{children}</Botao>;
};

export default Button;