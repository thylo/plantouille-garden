﻿import React, {useState} from "react";
import PlanteForm from "./PlanteForm";
import {Link, Route, useHistory} from "react-router-dom";
import {postData} from "../../Request/Requests";

/**
 * This component allow the admin to add a new plant to the DB
 * @param plantes
 * @returns {*}
 * @constructor
 */
const AddPlante = ({plantes, refresh}) => {
    const history = useHistory();
    const [error, setError] = useState("");
    const getPlanteList = (planteNames) => planteNames.map(name => plantes.find(plante => plante.name === name));
    
    const onAddPlante = newPlante => {
        if (plantes.filter(plante => plante.name === newPlante.name.toLowerCase()).length === 0) {
            setError("");
            //check if the plante we want to add doesn't already exists
            console.log("newPlante:", newPlante);
            postData('/plants', {
                name: newPlante.name.toLowerCase(),
                plantCategory: newPlante.plantCategory,
                pros: getPlanteList(newPlante.pros),
                cons: getPlanteList(newPlante.cons),
                seeding: newPlante.seeding,
                planting: newPlante.planting,
                harvest: newPlante.harvest,
                seedHarvest: newPlante.seedHarvest,
                hardiness: newPlante.hardiness,
                germPower: newPlante.germPower,
            }, refresh);
            
            //once created, the router set the url back to welcome screen
            history.push("/");
        } else {
            //TODO: display a message as the plant already exists
            setError(`La plante \'${newPlante.name.toLowerCase()}\' existe déjà`);
            console.log("La plante existe déjà");
        }
    };

    return (
        <Route path="/plantes/ajouter">
            <Link to="/">&#60;</Link>
            <h2>Ajouter plante</h2>
            <PlanteForm plantes={plantes} onSubmit={onAddPlante} error={error}/>
        </Route>
    )
};

export default AddPlante;
