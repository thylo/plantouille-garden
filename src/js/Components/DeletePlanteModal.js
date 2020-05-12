import React from "react";
import {Route, useHistory} from "react-router-dom";

const DeletePlanteModal = () => {
    const deletePlante = e => {
        e.preventDefault();
        console.log("deleted plante")
    };
    
    const history = useHistory();
    
    return (
        <Route path="/plantes/suprimer">
            <a href="#" onClick={() => {history.goBack()}}>X</a>
            <h2>Suprimer</h2>
            <p>Êtes-vous sur de vouloir suprimer cette plante ?</p>
            <ul>
                <li><a href="#" onClick={deletePlante}>oui</a></li>
                <li><a href="#">non</a></li>
            </ul>
        </Route>
    );
};

export default DeletePlanteModal;