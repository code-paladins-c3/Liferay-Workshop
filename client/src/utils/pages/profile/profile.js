import React from 'react';
import profileFoto from "./avatar.png"
import NaviBar from '../../../components/navbar/navbar.jsx';

function profile() {
    return (
        <>
        <div className="NaviBar">
                <NaviBar />
        </div>        
        <div className="editProfile">
            <div className="structure">
                <h1>Edit Profile</h1>
                <input type="image" src={profileFoto}  alt="Troque sua foto de perfil" className="avatar" />
            </div>
            <div className="form">
                <form className="boxForm">
                    <div className="form-group">
                        <label for="fullname"><h4>Nome Completo</h4>
                        <br/>
                            <input className="profileInput" type="text" id="fullname" name="fullname" required/>
                        </label>
                   
                    
                    
                    
                        <label for="email"><h4>Email</h4>
                        <br/>
                            <input className="profileInput" type="email" id="email" name="email" required/>
                        </label>
                    
                    
                        <label for="position"><h4>Cargo</h4></label>
                            <br/>
                        <input className="profileInput" type="text" id="position" name="position" required/>
            
                
                        <label for="position"><h4>Área de Interesse</h4></label>
                            <br/>
                        <input className="profileInput" type="text" id="position" name="position" required/>
                    
                    
                        <label for="position"><h4>Área de Conhecimento</h4></label>
                            <br/>
                        <input className="profileInput" type="text" id="position" name="position" required/> 
                        <br/>
                        <button type="submit">Salvar</button>
                    </div>
               
                
                   
                
                </form>
            </div>

        </div>
    
        </>
    );
}

export default profile;