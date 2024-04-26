import React, { useState } from 'react';
import logo from './Liferay-Logo-FC-Digital.png';
import './FirstAsccess.css';


const FirstAccess = () => {
    const [skills, setSkills] = useState('');
    const [learning, setLearning] = useState('');

    const handleSkillsChange = (event) => {
        setSkills(event.target.value);
    };

    const handleLearningChange = (event) => {
        setLearning(event.target.value);
    };

    return (
        <div>


            <div class="image">
                <img src={logo} alt="" />
            </div>


            <div class='text' >Quais suas habilidades?</div>
            <div>
                <select value={skills} onChange={handleSkillsChange}>
                    <optgroup label="FrontEnd">
                        <option value="">Selecione algo para aprender</option>
                        <option value="TypeScript">HTML</option>
                        <option value="TypeScript">CSS</option>
                        <option value="TypeScript">JavaScript</option>
                    </optgroup>
                    <optgroup label="BacktEnd">
                        <option value="GraphQL">Java</option>
                        <option value="Docker">Node.js</option>
                        <option value="Docker">C#</option>
                    </optgroup>
                </select>

            </div>

            <div class='text' >O que você quer aprender?</div>
            <div>
                <select value={learning} onChange={handleLearningChange}>
                <optgroup label="FrontEnd">
                        <option value="">Selecione algo para aprender</option>
                        <option value="TypeScript">HTML</option>
                        <option value="TypeScript">CSS</option>
                        <option value="TypeScript">JavaScript</option>
                    </optgroup>
                    <optgroup label="BacktEnd">
                        <option value="GraphQL">Java</option>
                        <option value="Docker">Node.js</option>
                        <option value="Docker">C#</option>
                    </optgroup>
                </select>

            </div>
            <button type="button" className='button'>Continue</button>
        </div>


    );
};

export default FirstAccess;