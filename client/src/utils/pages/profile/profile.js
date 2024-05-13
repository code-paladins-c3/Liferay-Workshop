import React from 'react';

function profile() {
    return (
        <>
        
        <form>
            <div class="form-group">
                <label for="fullname">Nome Completo:</label>
                <input type="text" id="fullname" name="fullname" required/>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required/>
            </div>
            <div class="form-group">
                <label for="position">Cargo:</label>
                <input type="text" id="position" name="position" required/>
            </div>
            <div class="form-group">
                <label for="area">Área de Atuação:</label>
                <input type="text" id="area" name="area" required/>
            </div>
            <div class="form-group">
                <label for="interest">Interesse:</label>
                <input type="text" id="interest" name="interest" required/>
            </div>
            <div class="button">
                <button type="submit">Salvar</button>
            </div>
        </form>
    
        </>
    );
}
<
export default profile;