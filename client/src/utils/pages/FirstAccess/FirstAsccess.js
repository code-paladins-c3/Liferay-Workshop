// src/utils/pages/FirstAccess/FirstAccess.js
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import logo from "./Liferay-Logo-FC-Digital.png";
import Select from "react-select";
import SessionContext from '../../../api/context/SessionContext';

const FirstAccess = () => {
  const [options, setOptions] = useState([]);
  const [skills, setSkills] = useState([]);
  const [learning, setLearning] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      fetchOptions();
    } else {
      navigate("/login");
    }
  }, [session, navigate]);

  const fetchOptions = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('id_skill, tema, skill');

      if (error) throw error;

      const groupedOptions = Object.values(data.reduce((groups, item) => {
        const group = (groups[item.tema] = groups[item.tema] || { label: item.tema, options: [] });
        group.options.push({ value: item.id_skill, label: item.skill });
        return groups;
      }, {}));


      setOptions(groupedOptions);
    } catch (error) {
      console.error("Error fetching options:", error);

    }
  };

  const handleSkillsChange = (selectedOptions) => {
    setSkills(selectedOptions);
  };

  const handleLearningChange = (selectedOptions) => {
    setLearning(selectedOptions);
  };

  const handleButtonClick = async () => {
    try {
      if (skills.length === 0 || learning.length === 0) {
        setError("Por favor, selecione ao menos uma habilidade e uma área de aprendizado.");
        return;
      }

      const userId = session.user.id;
      const skillsData = skills.map(skill => ({ user_id: userId, skill_id: skill.value }));
      const learningData = learning.map(learn => ({ user_id: userId, learning_skill_id: learn.value }));

      const { error: skillsError } = await supabase
        .from('user_skills_learning')
        .insert([...skillsData, ...learningData]);

      if (skillsError) throw skillsError;

      setSuccess("Dados salvos com sucesso!");
      navigate('/eventcreate');
    } catch (error) {
      setError("Erro ao salvar os dados. Tente novamente.");
      console.error("Error updating user skills:", error);
    }
  };

  return (
    <div>
      <div className="">
        <img className="logofirstAsccess" src={logo} alt="Liferay Logo" />
      </div>
      <div className="contFirstAsccess">
        <div className='textTopic'>Quais suas habilidades?</div>
        <div className="selectFirstAsccess">
          <Select
            value={skills}
            onChange={handleSkillsChange}
            options={options}
            isMulti
          />
        </div>
        <div className='textTopic'>O que você quer aprender?</div>
        <div className="selectFirstAsccess">
          <Select
            value={learning}
            onChange={handleLearningChange}
            options={options}
            isMulti
          />
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="button" className='buttonFirstAccess' onClick={handleButtonClick}>Continue</button>
      </div>
    </div>
  );
};

export default FirstAccess;
