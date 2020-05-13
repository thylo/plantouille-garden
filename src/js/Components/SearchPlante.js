import React, {useState} from "react";
import PlanteSearch from "./PlanteSearch";
import PlanteList from "./PlanteList";

const SearchPlante = ({plantes}) => {
    const [search, setSearch] = useState('');
    return (
        <div>
            <PlanteSearch pool={plantes} setPlanteToSearch={setSearch}/>
            <PlanteList plantes={plantes.filter(p=>p.name===search)} />
        </div>
    );
};

export default SearchPlante;
