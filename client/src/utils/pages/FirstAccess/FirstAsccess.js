import { useEffect, useState } from 'react';
import supabase from '../../../config/supabaseClient'
import logo from './Liferay-Logo-FC-Digital.png';
import Select from 'react-select';
import './FirstAsccess.css';


const FirstAccess = () => {

    const [options, setOptions] = useState([]);
    const [skills, setSkills] = useState([]);
    const [learning, setLearning] = useState([]);

    useEffect(() => {
        fetchOptions();
    }, []);

    const handleSkillsChange = (selectedOptions) => {
        setSkills(selectedOptions);
    };

    const handleLearningChange = (selectedOptions) => {
        setLearning(selectedOptions);
    };

    async function fetchOptions() {
        try {
            const { data, error } = await supabase
                .from('expertises')
                .select('tema, expertise');
    
            if (error) throw error;
    
            const groupedOptions = data.reduce((groups, item) => {
                const group = (groups[item.tema] = groups[item.tema] || { label: item.tema, options: [] });
                group.options.push({ value: item.tema, label: item.expertise });
                return groups;
            }, {});
          
    
            setOptions(Object.values(groupedOptions));
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    }


    return (
        <div>
            <div className="">
                <img className="logofirstAsccess" src={logo} alt="" />
            </div>

            <div className="contFirstAsccess">
                <div className='textTopic' >Quais suas habilidades?</div>
                <div className="selectFirstAsccess" >
                    <Select
                       value={skills}
                       onChange={handleSkillsChange}
                       options={options}
                       isMulti
                    />
                </div>

                <div className='textTopic' >O que você quer aprender?</div>
                <div className="selectFirstAsccess">
                    <Select
                        value={learning}
                        onChange={handleLearningChange}
                        options={options}
                        isMulti
                    />
                </div>
                <button type="button" className='button' >Continue</button>
            </div>
        </div>
    );
};

export default FirstAccess;