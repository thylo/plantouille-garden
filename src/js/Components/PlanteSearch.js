import React from "react";

/**
 * This component is a search bar for the plant list
 * @param setPlanteSearch
 * @returns {*}
 * @constructor
 */
const PlanteSearch = ({setPlanteSearch}) => {
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
