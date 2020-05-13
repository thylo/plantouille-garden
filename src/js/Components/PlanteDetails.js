import React from "react";
import {useParams} from "react-router-dom";
import {capitalize} from "../Utility/Utils";

/**
 * This component shows details on the selected plant
 * @param plantes
 * @returns {*}
 * @constructor
 */

//TODO: problem when details are displayed and the user refresh cause react to crash
const PlanteDetails = ({plantes}) => {
    const {planteId} = useParams();
    let nomPlante = plantes.find(plante => plante.id === parseInt(planteId)).name;
    
    return(
        <div>
            <h2>{capitalize(nomPlante)}</h2>
        </div>
    )
};

export default PlanteDetails;