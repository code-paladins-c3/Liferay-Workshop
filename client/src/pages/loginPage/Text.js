import React from 'react';
import styled from 'styled-components';

const Titulo = styled.h1`
    // Estilos do título
`;

const Subtitulo = styled.p`
    // Estilos do subtítulo
`;

const Texto = () => {
    return (
        <div>
            <Titulo>Conecte-se com pessoas ao redor do mundo</Titulo>
            <Subtitulo>Junte-se à nossa comunidade e expanda sua rede!</Subtitulo>
        </div>
    );
};

export default Texto;