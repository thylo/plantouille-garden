﻿import React from "react";
import {useHistory, useParams, Link} from "react-router-dom";
import {deleteData} from "../../Request/Requests";

/**
 * This component allows the admin to delete a plant from the DB
 * @param plantes
 * @param setPlantes
 * @returns {*}
 * @constructor
 */
const DeletePlanteModal = ({plantes, setPlantes}) => {
    const history = useHistory();
    let {planteId} = useParams();
    let nomPlante = plantes.find(plante => plante.id === parseInt(planteId)).name;
    
    const deletePlante = e => {
        e.preventDefault();
        //get the plant to delete
        const delPlante = plantes.splice(
            plantes.map((plante) => { return plante.id; }).indexOf(parseInt(planteId)), 1
        )[0];
        //send the request to the DB
        deleteData('/vegetables', delPlante);
        //The router set back to the welcome screen
        history.push("/")
    
    };
    
    return (
        <div>
            <Link to="/">X</Link>
            <h2>Suprimer {nomPlante} ?</h2>
            <p>Êtes-vous sur de vouloir suprimer cette plante ?</p>
            <ul>
                <li><button onClick={deletePlante}>oui</button></li>
                <li><button onClick={() => {history.push("/")}}>non</button></li>
            </ul>
        </div>
    );
};

export default DeletePlanteModal;