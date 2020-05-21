﻿import React, {useState} from "react";
import PlanteSearch from "./PlanteSearch";

/**
 * This component allow the user to make a research on a plant in the list
 * of plant from the app and display it in the list
 * then he can select one to add to composition
 * @param plantes
 * @returns {*}
 * @constructor
 */
const PlanteSelectSearch = ({plantes}) => {
    const [search, setSearch] = useState({name:"", plantCategory:["tous"]});

    return (
        <div>
            
        </div>
    );
};

export default PlanteSelectSearch;