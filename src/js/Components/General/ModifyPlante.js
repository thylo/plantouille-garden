import {updateData} from "../../Request/Requests";
import {getElementList} from "../../Utility/Utils";

﻿import React from "react";
import PlanteForm from "./PlanteForm";
import {useParams, useHistory, Link} from "react-router-dom";

/**
 * This component allow the admin to modify an existing plant
 * @param plantes
 * @param onModify
 * @returns {*}
 * @constructor
 */
const ModifyPlante = ({plantes, refresh}) => {
    let {planteId} = useParams();
    let planteToModify = plantes.find(plante => plante.id === parseInt(planteId));
    const history = useHistory();
    
    const onMofidy = modifiedPlante => {
        console.log("newPlante:", modifiedPlante);
        updateData('/plants', planteId,{
            name: modifiedPlante.name.toLowerCase(),
            plantCategory: modifiedPlante.plantCategory,
            pros: getElementList(plantes, modifiedPlante.pros),
            cons: getElementList(plantes, modifiedPlante.cons),
            seeding: modifiedPlante.seeding,
            planting: modifiedPlante.planting,
            harvest: modifiedPlante.harvest,
            seedHarvest: modifiedPlante.seedHarvest,
            hardiness: modifiedPlante.hardiness,
            germPower: modifiedPlante.germPower,
        }, refresh);

        //once updated, the router set the url back to welcome screen
        history.push("/");
    }
    
    return(
        <div>
            <Link to="/">&#60;</Link>
            <h2>Modifier {planteToModify.name}</h2>
            <PlanteForm plantes={plantes} onSubmit={onMofidy} formPlante={planteToModify}/>
        </div>
    );
};

export default ModifyPlante;