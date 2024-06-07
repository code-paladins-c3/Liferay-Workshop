import React, { useState, useEffect, useContext } from 'react';
import SessionContext from '../../../api/context/SessionContext';
import supabase from "../../../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import NaviBar from '../../../components/navbar/navbar';
import ProfileFoto from './avatar.png';

function Profile() {
    const session = useContext(SessionContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        fullname: '',
        email: '',
        position: '',
        interest_area: [],
        knowledge_area: [],
        avatar_url: ''
    });

    const [skills, setSkills] = useState({
        interest_area: [],
        knowledge_area: []
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = session.user;
                if (!user) {
                    console.error("Usuário não encontrado na sessão");
                    navigate("/login");
                    return;
                }

                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profileError) throw profileError;

                const { data: interestData, error: interestError } = await supabase
                    .from('user_skills_learning')
                    .select('skill_id')
                    .eq('user_id', user.id);

                if (interestError) throw interestError;

                const { data: knowledgeData, error: knowledgeError } = await supabase
                    .from('user_skills_learning')
                    .select('learning_skill_id')
                    .eq('user_id', user.id);

                if (knowledgeError) throw knowledgeError;

                const interestSkillsIds = interestData.map(item => item.skill_id).filter(Boolean);
                const knowledgeSkillsIds = knowledgeData.map(item => item.learning_skill_id).filter(Boolean);

                const { data: interestSkillsData, error: interestSkillsError } = await supabase
                    .from('skills')
                    .select('skill')
                    .in('id_skill', interestSkillsIds);

                if (interestSkillsError) throw interestSkillsError;

                const { data: knowledgeSkillsData, error: knowledgeSkillsError } = await supabase
                    .from('skills')
                    .select('skill')
                    .in('id_skill', knowledgeSkillsIds);

                if (knowledgeSkillsError) throw knowledgeSkillsError;

                setProfile({
                    ...profileData,
                    interest_area: interestSkillsData.map(item => item.skill),
                    knowledge_area: knowledgeSkillsData.map(item => item.skill)
                });

                setSkills({
                    interest_area: interestSkillsData,
                    knowledge_area: knowledgeSkillsData
                });

            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, [session.user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSkillRemove = async (type, skill) => {
        try {
            const skillToRemove = skills[type].find(s => s.skill === skill);
            if (!skillToRemove) return;

            const column = type === 'interest_area' ? 'skill_id' : 'learning_skill_id';

            const { error } = await supabase
                .from('user_skills_learning')
                .delete()
                .eq('user_id', session.user.id)
                .eq(column, skillToRemove.id_skill);

            if (error) throw error;

            setProfile(prevProfile => ({
                ...prevProfile,
                [type]: prevProfile[type].filter(s => s !== skill)
            }));

            setSkills(prevSkills => ({
                ...prevSkills,
                [type]: prevSkills[type].filter(s => s.skill !== skill)
            }));

        } catch (error) {
            console.error(`Error removing skill from ${type}:`, error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    fullname: profile.fullname,
                    email: profile.email,
                    position: profile.position,
                    avatar_url: profile.avatar_url
                })
                .eq('id', session.user.id);

            if (profileError) throw profileError;

            await supabase
                .from('user_skills_learning')
                .delete()
                .eq('user_id', session.user.id);

            const newInterestSkills = skills.interest_area.filter(skill => profile.interest_area.includes(skill.skill))
                .map(skill => ({
                    user_id: session.user.id,
                    skill_id: skill.id_skill
                }));
            const newKnowledgeSkills = skills.knowledge_area.filter(skill => profile.knowledge_area.includes(skill.skill))
                .map(skill => ({
                    user_id: session.user.id,
                    learning_skill_id: skill.id_skill
                }));

            const { error: interestError } = await supabase
                .from('user_skills_learning')
                .insert([...newInterestSkills, ...newKnowledgeSkills]);

            if (interestError) throw interestError;

            console.log("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <>
            <div className="editProfile-Profile">
                <div className="structure-Profile">
                    <h1 className='editarPerfil-Profile'>Editar Perfil:</h1>
                    <input 
                        type="image" 
                        src={profile.avatar_url || ProfileFoto}  
                        alt="Troque sua foto de perfil" 
                        className="avatar-Profile" 
                    />
                </div>
                <div className="form-Profile">
                    <form className="boxForm-Profile" onSubmit={handleSubmit}>
                        <div className="form-group-Profile">
                            <label htmlFor="fullname">
                                <h4>Nome Completo</h4>
                                <input 
                                    className="profileInput-Profile" 
                                    type="text" 
                                    id="fullname" 
                                    name="fullname" 
                                    value={profile.username} 
                                    onChange={handleChange} 
                                    required
                                />
                            </label>

                            <label htmlFor="email">
                                <h4>Email</h4>
                                <input 
                                    className="profileInput-Profile" 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={profile.email} 
                                    onChange={handleChange} 
                                    required
                                />
                            </label>

                            <label htmlFor="position">
                                <h4>Cargo</h4>
                                <input 
                                    className="profileInput-Profile" 
                                    type="text" 
                                    id="position" 
                                    name="position" 
                                    value={profile.position} 
                                    onChange={handleChange} 
                                    required
                                />
                            </label>

                            <div className='area-inti-profile'>
                                <h4>Área de Interesse</h4>
                                <div>
                                    {profile.interest_area.map(skill => (
                                        <div key={skill} className="skillTag-Profile">
                                            {skill}
                                            <span 
                                                className="removeSkill-Profile" 
                                                onClick={() => handleSkillRemove('interest_area', skill)}
                                            >
                                                &times;
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='area-inti-profile'>
                                <h4>Área de Conhecimento</h4>
                                <div>
                                    {profile.knowledge_area.map(skill => (
                                        <div key={skill} className="skillTag-Profile">
                                            {skill}
                                            <span 
                                                className="removeSkill-Profile" 
                                                onClick={() => handleSkillRemove('knowledge_area', skill)}
                                            >
                                                &times;
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="button-Profile" type="submit">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="NaviBar-Profile">
                <NaviBar />
            </div>
        </>
    );
}

export default Profile;
