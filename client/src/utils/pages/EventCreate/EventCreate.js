import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import supabase from '../../../config/supabaseClient';
import NaviBar from '../../../components/navbar/navbar';
import SessionContext from '../../../api/context/SessionContext';

const PhotoPreview = ({ photo }) => {
    return (
        <div className="photo-preview">
            {photo && <img src={photo} alt="Preview" className="preview-image" />}
        </div>
    );
};

const EventCreate = () => {
    const { user } = useContext(SessionContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [skills, setSkills] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [photo, setPhoto] = useState('');
    const [linkk, setLinkk] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [tag, setTag] = useState('');
    const [photoFile, setPhotoFile] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchSkills();
        }
    }, [user, navigate]);

    const fetchSkills = async () => {
        try {
            const { data, error } = await supabase
                .from('skills')
                .select('id_skill, tema, skill');

            if (error) throw error;

            const groupedSkills = data.map(item => ({
                value: item.id_skill,
                label: `${item.tema} - ${item.skill}`
            }));

            setSkills(groupedSkills);
        } catch (error) {
            console.error('Error fetching Skills:', error);
        }
    };

    const handleSkillChange = (selectedOption) => {
        setSelectedSkill(selectedOption);
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

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handleCancel = () => {
        setPhoto('');
        setPhotoFile(null);
    };

    const handleMaxParticipantsChange = (event) => {
        setMaxParticipants(event.target.value);
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setPhotoFile(file);
        setPhoto(URL.createObjectURL(file));
    };

    const uploadPhotoToStorage = async () => {
        if (photoFile) {
            const fileName = `${Date.now()}_${photoFile.name}`;
            const { data, error } = await supabase
                .storage
                .from('EventsPhotos')
                .upload(fileName, photoFile);

            if (error) throw error;
            const photoURL = supabase
                .storage
                .from('EventsPhotos')
                .getPublicUrl(fileName).data.publicUrl;
            return photoURL;
        }
        return '';
    };

    const handleEventCreate = async () => {
        try {
            const photoURL = await uploadPhotoToStorage();

            const event = {
                name,
                description,
                theme: selectedSkill.label,
                date,
                time,
                photo: "photoURL",
                linkk,
                maxparticipants: parseInt(maxParticipants, 10),
                tag,
                userid: user.id,
                skillid: selectedSkill.value
            };

            const { data, error } = await supabase.from('event').insert([event]);
            if (error) throw error;

            console.log('Evento criado com sucesso:', data);
            navigate('/mainevents');  // Redirect to a list of events or any other appropriate page
        } catch (error) {
            console.error('Erro ao criar evento:', error);
        }
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
                        <Select 
                            value={selectedSkill}
                            onChange={handleSkillChange}
                            options={skills}
                            className="selectSkillEventCreate"
                        />
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
                        <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} className="input-photo-EventCreate" />
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
                        <button className="button-Create" id="button-EventCreate" type="button" onClick={handleEventCreate}>Criar Evento</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EventCreate;
