import React from "react";
import PlanteForm from "./PlanteForm";
import {Route, useHistory, useParams} from "react-router-dom";

const ModifyPlante = ({plantes, setPlantes}) => {
    const history = useHistory();
    const params = useParams();
    return(
        <Route path={`/plantes/${params}/modifier`}>
            <a href="#" onClick={() => {history.goBack()}}>&#60;</a>
            <h2>Modifier</h2>
            <PlanteForm plantes={plantes} />
        </Route>
    );
};

export default ModifyPlante;