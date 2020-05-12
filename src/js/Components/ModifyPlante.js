import React from "react";
import PlanteForm from "./PlanteForm";
import {useHistory, useParams} from "react-router-dom";

const ModifyPlante = ({plantes, setPlantes}) => {
    const history = useHistory();
    let {planteId} = useParams();
    let nomPlante = plantes.find(plante => plante.id === parseInt(planteId)).nom;
    return(
        <div>
            <a href="#" onClick={() => {history.goBack()}}>&#60;</a>
            <h2>Modifier {nomPlante}</h2>
            <PlanteForm plantes={plantes} onSubmit={setPlantes}/> {/*planteToModify={plantes.find(plante => plante.id === planteId)*/}
        </div>
    );
};

export default ModifyPlante;