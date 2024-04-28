import React, { useState } from 'react';
import logo from './Liferay-Logo-FC-Digital.png';
import Select from 'react-select';
import './FirstAsccess.css';

const FirstAccess = () => {
    const [skills, setSkills] = useState([]);
    const [learning, setLearning] = useState([]);

    const handleSkillsChange = (selectedOptions) => {
        setSkills(selectedOptions);
    };

    const handleLearningChange = (selectedOptions) => {
        setLearning(selectedOptions);
    };

    // Options for select components
    const options = [
        {
            label: 'FrontEnd',
            options: [
                { value: 'HTML', label: 'HTML' },
                { value: 'CSS', label: 'CSS' },
                { value: 'JavaScript', label: 'JavaScript' },
            ]
        },
        {
            label: 'BackEnd',
            options: [
                { value: 'Java', label: 'Java' },
                { value: 'Node.js', label: 'Node.js' },
                { value: 'C#', label: 'C#' },
            ]
        }
    ];

    

    return (
        <div>
            <div class="">
                <img class="logofirstAsccess" src={logo} alt="" />
            </div>

            <div class="contFirstAsccess">
                <div class='textTopic' >Quais suas habilidades?</div>
                <div class="selectFirstAsccess" >
                    <Select
                        value={skills}
                        onChange={handleSkillsChange}
                        options={options}
                        isMulti
                    />
                </div>

                <div class='textTopic' >O que você quer aprender?</div>
                <div class="selectFirstAsccess">
                    <Select
                        value={learning}
                        onChange={handleLearningChange}
                        options={options}
                        isMulti
                    />
                </div>
                <button type="button" className='button'>Continue</button>
            </div>
        </div>
    );
};

export default FirstAccess;