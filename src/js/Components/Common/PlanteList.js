import {capitalize} from "../../Utility/Utils";
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
        <ul className="plantList">
            {plantes.sort((a, b) => {
                if(a.name > b.name){
                    return 1;
                }
                
                else if(a.name < b.name){
                    return -1;
                }
                
                else{
                    return 0;
                }
            }).map(plante => {
                return (
                    <li className="plantList__item" key={plante.id}>
                        <Link className="plantList__link" to={`/plantes/details/${plante.id}`}>{capitalize(plante.name)}</Link>
                        <Link className="plantList__link" to={`/plantes/modifier/${plante.id}`}> Modifier</Link>
                        <Link className="plantList__link" to={`/plantes/suprimer/${plante.id}`}> Supprimer</Link>
                    </li>
                )
            })}
        </ul>
    );
};

export default PlanteList;