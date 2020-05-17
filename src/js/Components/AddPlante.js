import React from "react";
import PlanteForm from "./PlanteForm";
import {Link, Route, useHistory} from "react-router-dom";
import {postData} from "../Request/Requests";

/**
 * This component allow the admin to add a new plant to the DB
 * @param plantes
 * @returns {*}
 * @constructor
 */
const AddPlante = ({plantes}) => {
    const history = useHistory();
    const getPlanteList = (planteNames) => {
        return planteNames.map(name => plantes.find(plante => plante.name === name))
    };
    
    const onAddPlante = newPlante => {
        if (plantes.filter(plante => plante.name === newPlante.name.toLowerCase()).length === 0) {
            //check if the plante we want to add doesn't already exists
            console.log("newPlante:", newPlante);
            //TODO: failing to post correct values
            postData('/vegetables', {
                name: newPlante.name.toLowerCase(),
                pros: getPlanteList(newPlante.pros),
                cons: getPlanteList(newPlante.cons)
            });
            
            //once created, the router set the url back to welcome screen
            history.push("/");
        } else {
            //TODO: display a message as the plant already exists
            console.log("La plante existe déjà");
        }
    };

    return (
        <Route path="/plantes/ajouter">
            <Link to="/">&#60;</Link>
            <h2>Ajouter plante</h2>
            <PlanteForm plantes={plantes} onSubmit={onAddPlante}/>
        </Route>
    )
};

export default AddPlante;