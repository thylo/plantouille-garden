﻿import React from "react";
import PlanteForm from "./PlanteForm";
import {useParams, Link} from "react-router-dom";

/**
 * This component allow the admin to modify an existing plant
 * @param plantes
 * @param onModify
 * @returns {*}
 * @constructor
 */
const ModifyPlante = ({plantes, onModify}) => {
    let {planteId} = useParams();
    let planteToModify = plantes.find(plante => plante.id === parseInt(planteId));
    
    return(
        <div>
            <Link to="/">&#60;</Link>
            <h2>Modifier {planteToModify.name}</h2>
            <PlanteForm plantes={plantes} onSubmit={onModify} formPlante={planteToModify}/>
        </div>
    );
};

export default ModifyPlante;