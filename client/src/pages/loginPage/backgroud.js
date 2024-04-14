import React from 'react';
import styled from 'styled-components';

const BackgroundImage = styled.div`
    background-image: url('./public/imagem.png');
    background-size: cover;
    background-position: center;
    width: 100vw;
    height: 100vh;
`;

const ImagemFundo = () => {
    return <BackgroundImage />;
};

export default ImagemFundo;