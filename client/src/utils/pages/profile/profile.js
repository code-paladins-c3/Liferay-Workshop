import React from 'react';
import profileFoto from "./avatar.png"

function profile() {
    return (
        <>
        
        <div class="editProfile">
        <div class="structure">
            <h1>Edit Profile</h1>
            <input type="image" src={profileFoto}  alt="Troque sua foto de perfil" class="avatar" />
        </div>
        <div class="form">
            <form class="boxForm">
                <div class="form-group">
                    <label for="fullname">Nome Completo
                    <input class="profileInput" type="text" id="fullname" name="fullname" required/>
                    </label>
                   
                    
                </div>
                <div class="form-group">
                    <label for="email">Email
                    <input class="profileInput" type="email" id="email" name="email" required/>
                    </label>
                    
                    
                </div>
                <div class="form-group">
                    <label for="position">Cargo</label>
                    <br/>
                    <input class="profileInput" type="text" id="position" name="position" required/>
                </div>
                <div class="form-group">
                    <label for="position">Área de Interesse</label>
                    <br/>
                    <input class="profileInput" type="text" id="position" name="position" required/>
                </div>
                <div class="form-group">
                    <label for="position">Área de Conhecimento</label>
                    <br/>
                    <input class="profileInput" type="text" id="position" name="position" required/>
                </div>
               
                
                    <button type="submit">Salvar</button>
                
            </form>
        </div>

    </div>
    
        </>
    );
}

export default profile;