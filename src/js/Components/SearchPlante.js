import React, {useState} from "react";
import PlanteSearch from "./PlanteSearch";
import PlanteList from "./PlanteList";

const SearchPlante = ({plantes}) => {
    const [search, setSearch] = useState(plantes);
    return (
        <div>
            <PlanteSearch pool={plantes} setPlanteToSearch={setSearch}/>
            <PlanteList search={search}/>
        </div>
    );
};

export default SearchPlante;