import React from "react";
import PlanteForm from "./PlanteForm";
import {Route, useHistory} from "react-router-dom";

const AddPlante = ({plantes, setPlantes}) => {
    const history = useHistory();
    const onAddPlante = newPlante => {
        console.log(newPlante);
        if (plantes.filter(plante => plante.nom === newPlante.nom.toLowerCase()).length === 0) {
            setPlantes([
                ...plantes,
                {
                    id: plantes.length,
                    nom: newPlante.nom.toLowerCase(),
                    pros: newPlante.pros,
                    cons: newPlante.cons
                }
            ]);
            
            history.push("/");
        } else {
            console.log("La plante existe déjà");
        }

        console.log(plantes);
    };

    return (
        <Route path="/plantes/ajouter">
            <a href="#" onClick={() => {history.goBack()}}>&#60;</a>
            <h2>Ajouter plante</h2>
            <PlanteForm plantes={plantes} onSubmit={onAddPlante}/>
        </Route>
    )
};

export default AddPlante;