import React, { useState } from 'react';
import './EventCreate.css';


const EventCreate = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [theme, setTheme] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [photo, setPhoto] = useState('');
    const [linkk, setLinkk] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [tag, setTag] = useState('');

    const handleTagChange = (event) => {
        setTag(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handlePhotoChange = (event) => {
        setPhoto(event.target.value);
    };

    const handleLinkkChange = (event) => {
        setLinkk(event.target.value);
    };

    const handleMaxParticipantsChange = (event) => {
        setMaxParticipants(event.target.value);
    };

    return (
        <div className="container">
           
           
            <div className="texto_criarEvento">
            <h2>Criar Novo Evento</h2>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="name" className="label">Nome do Evento</label>
                    <input type="text" id="name" value={name} onChange={handleNameChange} className="input-field" />
                </div>

                <div className="form-group">
                    <label htmlFor="theme" className="label">Tema</label>
                    <input type="text" id="theme" value={theme} onChange={handleThemeChange} className="input-field" />
                </div>

                <div className="form-group">
                    <label htmlFor="date" className="label">Data</label>
                    <input type="date" id="date" value={date} onChange={handleDateChange} className="input-field" />
                </div>

                <div className="form-group">
                    <label htmlFor="time" className="label">Hora</label>
                    <input type="time" id="time" value={time} onChange={handleTimeChange} className="input-field" />
                </div>

                <div className="form-group">
                    <label htmlFor="tag" className="label">TAG</label>
                    <input type="text" id="tag" value={tag} onChange={handleTagChange} className="input-field" />
                </div>

                <div className="form-group">
                    <label htmlFor="photo" className="label">Foto</label>
                    <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} className="input-field" />
                </div>

                <div className="form-group">
                    <label htmlFor="linkk" className="label">Link</label>
                    <input type="text" id="linkk" value={linkk} onChange={handleLinkkChange} className="input-field" />
                </div>

                <div className="form-group">
                    <label htmlFor="maxParticipants" className="label">Número Máximo de Participantes</label>
                    <input type="number" id="maxParticipants" value={maxParticipants} onChange={handleMaxParticipantsChange} className="input-field" />
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="label">Descrição</label>
                    <textarea id="description" value={description} onChange={handleDescriptionChange} className="input-field" rows="4"></textarea>
                </div>

                <div className="button-container">
                    <button type="button" className="button">Criar Evento</button>
                </div>
            </form>
        </div>
    );
}

export default EventCreate;

// Path: client/src/utils/pages/EventCreate/EventCreate.css