import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import supabase from '../../../config/supabaseClient';
import NaviBar from '../../../components/navbar/navbar.jsx';


const PhotoPreview = ({ photo }) => {
    return (
        <div className="photo-preview">
            {photo && <img src={photo} alt="Preview" className="preview-image" />}
        </div>
    );
};

const EventCreate = () => {

    const location = useLocation();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [skill, setSkill] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [photo, setPhoto] = useState('');
    const [linkk, setLinkk] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [tag, setTag] = useState('');
    const [showFileInput, setShowFileInput] = useState(true);
    const userId = location.state.userId;
    const skillId = userId;
    const [skills, setSkills] = useState([]);


    async function fetchSkill() {
        try {
            const { data, error } = await supabase
                .from('skills')
                .select('tema, skill');
    
            if (error) throw error;

            const groupedSkills = data.reduce((groups, item) => {
                const group = (groups[item.tema] = groups[item.tema] || { label: item.tema, Skills: [] });
                group.Skills.push({ value: item.tema, label: item.expertise });
                return groups;
            }, {});
          
    
            setSkill(Object.values(groupedSkills));
        } catch (error) {
            console.error('Error fetching Skill:', error);
        }
    };
    
   
    
    const handleLinkkChange = (event) => {
        setLinkk(event.target.value);
    };
    
    const handleTagChange = (event) => {
        setTag(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSkillsChange = (selectedSkill) => {
        setSkill(selectedSkill);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handleCancel = () => {
        setPhoto('');
        setShowFileInput(true); // Show file input when canceling the photo
    };

    const handleMaxParticipantsChange = (event) => {
        setMaxParticipants(event.target.value);
    };


    const handleEventCreate = async () => {
        const event = {
            name: name,
            description: description,
            skill: skill,
            date: date,
            time: time,
            photo: photo,
            linkk: linkk,
            maxParticipants: maxParticipants,
            tag: tag,
            userId: userId, // assumindo que você tem o userId do usuário atual
            skillId: skillId // assumindo que você tem o skillId do evento
        };
    
        const { data, error } = await supabase
            .from('Event')
            .insert([event]);
    
        if (error) {
            console.log('Erro ao criar evento:', error);
        } else {
            console.log('Evento criado com sucesso:', data);
        }
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setPhoto(URL.createObjectURL(file));
        setShowFileInput(false); // Hide file input after photo is previewed
    };

    

    return (
        
        <div>

            <div className="NaviBar">
            <NaviBar />
            </div>
        

        <div className="container-EventCreate">
           
            
           
            <div className="texto_criarEvento">
            <h2>Criar Novo Evento</h2>
            </div>
            <form>
                <div className="form-group-EventCreate">
                    <label htmlFor="name" className="label-EventCreate">Nome do Evento</label>
                    <input type="text" id="name" value={name} onChange={handleNameChange} className="input-EventCreate" />
                </div>

                <div className="form-group-EventCreate">
                    <label htmlFor="skill" className="label-EventCreate">Tema</label>
                    <div className="selectSkillEventCreate" >
                    <Select
                       value={skills}
                       onChange={handleSkillsChange}
                       Skill={skill}
                    />
                </div>
                </div>

                <div className="form-group-EventCreate">
                    <label htmlFor="date" className="label-EventCreate">Data</label>
                    <input type="date" id="date" value={date} onChange={handleDateChange} className="input-EventCreate" />
                </div>

                <div className="form-group-EventCreate">
                    <label htmlFor="time" className="label-EventCreate">Hora</label>
                    <input type="time" id="time" value={time} onChange={handleTimeChange} className="input-EventCreate" />
                </div>

                <div className="form-group-EventCreate">
                    <label htmlFor="tag" className="label-EventCreate">TAG</label>
                    <input type="text" id="tag" value={tag} onChange={handleTagChange} className="input-EventCreate" />
                </div>

                <div className="form-group-EventCreate">
                    <label htmlFor="photo" className="label-EventCreate">Foto</label>
                    {showFileInput && <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} className="input-photo-EventCreate" />}
                    <PhotoPreview photo={photo} />
                    {photo && <button type="button" onClick={handleCancel} className="cancel-button">Cancelar</button>}
                </div>

                <div className="form-group-EventCreate">
                    <label htmlFor="link" className="label-EventCreate">Link</label>
                    <input type="text" id="likk" value={linkk} onChange={handleLinkkChange} className="input-EventCreate" />
                </div>

                <div className="form-group-EventCreate">
                    <label htmlFor="maxParticipants" className="label-EventCreate">Número Máximo de Participantes</label>
                    <input type="number" id="maxParticipants" value={maxParticipants} onChange={handleMaxParticipantsChange} className="input-EventCreate" />
                </div>

                <div className="form-group-EventCreate">
                    <label htmlFor="description" className="label-EventCreate">Descrição</label>
                    <textarea id="description" value={description} onChange={handleDescriptionChange} className="input-EventCreate" rows="4"></textarea>
                </div>

                <div className="button-container">
                <button id="button-EventCreate" onClick={handleEventCreate}>Criar Evento</button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default EventCreate;

// Path: client/src/utils/pages/FirstAccess/FirstAccess.js