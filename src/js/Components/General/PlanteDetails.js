﻿import React from "react";
import {useParams} from "react-router-dom";
import {capitalize} from "../../Utility/Utils";

/**
 * This component shows details on the selected plant
 * @param plantes
 * @returns {*}
 * @constructor
 */

//TODO: problem when details are displayed and the user refresh cause react to crash
const PlanteDetails = ({plantes}) => {
    const {planteId} = useParams();
    const checkNull = (prop, title) => {
        if(prop != null){
            return(
                <div>
                    <h3>{title}</h3>
                    <p>{prop}</p>
                </div>
            );
        }    
    };
    
    let planteDetails = plantes.find(plante => plante.id === parseInt(planteId));
    
    return(
        <div>
            <h2>{capitalize(planteDetails.name)}</h2>
            <h3>Categorie</h3>
            <p>{planteDetails.plantCategory}</p>
            <h3>Semage</h3>
            <p>{planteDetails.seeding}</p>
            <h3>Plantation</h3>
            <p>{planteDetails.planting}</p>
            <h3>récolte</h3>
            <p>{planteDetails.harvest}</p>
            <h3>récolte des graines</h3>
            <p>{planteDetails.seedHarvest}</p>
            {checkNull(planteDetails.germPower, "Pouvoir germinatif")}
            {checkNull(planteDetails.hardiness, "Rusticité")}
        </div>
    )
};

export default PlanteDetails;