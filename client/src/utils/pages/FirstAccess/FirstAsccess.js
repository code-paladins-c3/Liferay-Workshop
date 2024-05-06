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

    // Assuming you have a function to fetch options
    async function fetchOptions() {
        // Fetch options and handle errors
    }

    const handleButtonClick = async () => {
        // Update first_access to false
        // Add skills and learning to Supabase

        // Replace with actual user's id
        const userId = 1;

        for (const skill of skills) {
            const { data: expertiseData, error: expertiseError } = await supabase
                .from('expertises')
                .select('id')
                .eq('expertise', skill.value);

            if (expertiseError || !expertiseData || !expertiseData.length) {
                console.error('Error fetching expertise:', expertiseError);
                continue;
            }

            const { error } = await supabase
                .from('user_expertises')
                .insert({ user_id: userId, expertise_id: expertiseData[0].id });

            if (error) {
                console.error('Error adding expertise:', error);
            }
        }

        for (const learningItem of learning) {
            const { data: expertiseData, error: expertiseError } = await supabase
                .from('expertises')
                .select('id')
                .eq('expertise', learningItem.value);

            if (expertiseError || !expertiseData || !expertiseData.length) {
                console.error('Error fetching expertise:', expertiseError);
                continue;
            }

            const { error } = await supabase
                .from('user_learning')
                .insert({ user_id: userId, expertise_id: expertiseData[0].id });

            if (error) {
                console.error('Error adding learning:', error);
            }
        }
    };

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
                <button type="button" className='button' onClick={handleButtonClick}>Continue</button>
            </div>
        </div>
    );
};

export default FirstAccess;