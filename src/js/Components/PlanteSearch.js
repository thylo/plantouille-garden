import React from "react";

const PlanteSearch = ({setPlanteToSearch}) => {
    const onSearchPlante = event => {
        setPlanteSearch(event.target.value)
    };

    return (
        <form>
            <label>Search</label>
            <input type="text" name="searchPlante" onChange={onSearchPlante}/>
        </form>
    );
};

export default PlanteSearch;
