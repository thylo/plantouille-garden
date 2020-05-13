import React from "react";
import {Link} from "react-router-dom";

const PlanteList = ({search}) => {
    return (
        <ul>
            {search.map(plante => {
                return (
                    <li key={plante.id}>
                        <Link to={`/plantes/details/${plante.id}`}>{plante.name}</Link>
                        <Link to={`/plantes/modifier/${plante.id}`}> Modifier</Link>
                        <Link to={`/plante/suprimer/${plante.id}`}> Supprimer</Link>
                    </li>
                )
            })}
        </ul>
    );
};

export default PlanteList;