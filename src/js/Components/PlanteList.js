import React from "react";

const PlanteList = ({search}) => {
    return (
        <ul>
            {search.map(plante => {
                return (
                    <li><a href="#">{plante.nom}</a></li>
                )
            })}
        </ul>
    );
};

export default PlanteList;