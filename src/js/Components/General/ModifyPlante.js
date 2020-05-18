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
    let nomPlante = plantes.find(plante => plante.id === parseInt(planteId)).name;
    
    return(
        <div>
            <Link to="/">&#60;</Link>
            <h2>Modifier {nomPlante}</h2>
            <PlanteForm plantes={plantes} onSubmit={onModify}/> {/*planteToModify={plantes.find(plante => plante.id === planteId)*/}
        </div>
    );
};

export default ModifyPlante;