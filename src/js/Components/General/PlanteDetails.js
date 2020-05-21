﻿import React from "react";
import {useParams} from "react-router-dom";
import {capitalize, findObject} from "../../Utility/Utils";

/**
 * This component shows details on the selected plant
 * @param plantes
 * @returns {*}
 * @constructor
 */

//TODO: problem when details are displayed and the user refresh cause react to crash
const PlanteDetails = ({plantes}) => {
    const {planteId} = useParams();    
    let planteDetails = findObject(plantes, "id", parseInt(planteId));
    
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
            
            <h3>Pouvoir germinatif</h3>
            <p>{planteDetails.germPower}</p>
            
            <h3>Rusticité</h3>
            <p>{planteDetails.hardiness}</p>
            
            <h3>Association favorables</h3>
            <ul>
                {planteDetails.pros.map(plante => {
                    return(
                        <li key={plante.id}>{plante.name}</li>
                    )
                })}
            </ul>

            <h3>Association défavorables</h3>
            <ul>
                {planteDetails.cons.map(plante => {
                    return(
                        <li key={plante.id}>{plante.name}</li>
                    )
                })}
            </ul>
        </div>
    )
};

export default PlanteDetails;