import {capitalize, findObject} from "../../Utility/Utils";

﻿import React from "react";
import {Link} from "react-router-dom";

/**
 * This component display a list of passed plants
 * @param plantes
 * @returns {*}
 * @constructor
 */
const PlanteList = ({plantes, onClick}) => {
    const onClickHandler = e => {
        e.preventDefault();
        onClick(findObject(plantes, "id", e.key))
    };
    return (
        <ul>
            {plantes.map(plante => {
                return (
                    <li key={plante.id}>
                        <a href="/" key={plante.id} onClick={onClickHandler}>{capitalize(plante.name)}</a>
                    </li>
                )
            })}
        </ul>
    );
};

export default PlanteList;