import React from "react";
import {Route, useHistory, useParams} from "react-router-dom";

const DeletePlanteModal = ({plantes, setPlantes}) => {
    const deletePlante = e => {
        e.preventDefault();
        console.log("delete");
        const newPlantes = plantes.splice(
            plantes.map((plante) => { return plante.id; }).indexOf(parseInt(planteId)), 1
        );
        setPlantes(newPlantes);
        history.push("/")
    };
    
    const history = useHistory();
    let {planteId} = useParams();
    let nomPlante = plantes.find(plante => plante.id === parseInt(planteId)).name;
    
    return (
        <div>
            <a href="#" onClick={() => {history.goBack()}}>X</a>
            <h2>Suprimer {nomPlante} ?</h2>
            <p>Êtes-vous sur de vouloir suprimer cette plante ?</p>
            <ul>
                <li><a href="#" onClick={deletePlante}>oui</a></li>
                <li><a href="#" onClick={() => {history.push("/")}}>non</a></li>
            </ul>
        </div>
    );
};

export default DeletePlanteModal;