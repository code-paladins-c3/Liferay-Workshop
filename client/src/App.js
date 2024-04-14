import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/loginPage/Onboarding';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Onboarding />} />
                {/* Adicionar rotas para telas de registro e login */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;