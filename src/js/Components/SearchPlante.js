import React, {useState} from "react";
import PlanteSearch from "./PlanteSearch";
import PlanteList from "./PlanteList";

/**
 * This component allow the user to make a research on a plant in the list 
 * of plant from the app and display it in the list
 * @param plantes
 * @returns {*}
 * @constructor
 */
const SearchPlante = ({plantes}) => {
    const [search, setSearch] = useState('');
    return (
        <div>
            <PlanteSearch pool={plantes} setPlanteSearch={setSearch}/>
            <PlanteList plantes={plantes.filter(p=>p.name.includes(search))} />
        </div>
    );
};

export default SearchPlante;
