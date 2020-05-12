import React from "react";

const PlanteSearch = ({pool, setPlanteToSearch}) => {
    const onSearchPlante = search => {

        if (search.target.value === "") {
            setPlanteToSearch(pool);
        } else {
            setPlanteToSearch(pool.filter(plante => plante.nom.includes(search.target.value)));
        }
    };

    return (
        <form>
            <label>Search</label>
            <input type="text" name="searchPlante" onChange={onSearchPlante}/>
        </form>
    );
};

export default PlanteSearch;