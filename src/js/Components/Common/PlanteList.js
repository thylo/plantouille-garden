﻿import React from "react";
import {Link} from "react-router-dom";

/**
 * This component display a list of passed plants
 * @param plantes
 * @returns {*}
 * @constructor
 */
const PlanteList = ({plantes}) => {
    return (
        <ul>
            {plantes.map(plante => {
                return (
                    <li key={plante.id}>
                        <Link to={`/plantes/details/${plante.id}`}>{plante.name}</Link>
                        <Link to={`/plantes/modifier/${plante.id}`}> Modifier</Link>
                        <Link to={`/plantes/suprimer/${plante.id}`}> Supprimer</Link>
                    </li>
                )
            })}
        </ul>
    );
};

export default PlanteList;