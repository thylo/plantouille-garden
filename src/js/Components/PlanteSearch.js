import React from "react";

const PlanteSearch = ({pool, setPlanteToSearch}) => {
    const onSearchPlante = search => {

        if (search.target.value === "" || search.target.value === null) {
            setPlanteToSearch(pool);
            console.log("no search");
        } else {
            setPlanteToSearch(pool.filter(plante => plante.name.includes(search.target.value)));
            console.log("there is a search");
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